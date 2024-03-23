package cn.net.wuxin.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import org.apache.commons.codec.binary.Base64;
import org.jsoup.Connection;
import org.jsoup.Jsoup;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;

public class QzoneService {
    NumberService numberService = new NumberService();

    public Map<String, String> getLoginSig() throws IOException {
        String url = "https://xui.ptlogin2.qq.com/cgi-bin/xlogin?" +
                "proxy_url=https%3A//qzs.qq.com/qzone/v6/portal/proxy.html" +
                "&daid=5&&hide_title_bar=1&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=549000912&style=22&target=self" +
                "&s_url=https%3A%2F%2Fqzs.qzone.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone" +
                "&pt_qr_app=%E6%89%8B%E6%9C%BAQQ%E7%A9%BA%E9%97%B4" +
                "&pt_qr_link=http%3A//z.qzone.com/download.html" +
                "&self_regurl=https%3A//qzs.qq.com/qzone/v6/reg/index.html" +
                "&pt_qr_help_link=http%3A//z.qzone.com/download.html&pt_no_auth=1";
        Connection connect = Jsoup.connect(url);
        connect.ignoreContentType(true);
        Connection.Response execute = connect.execute();
        return execute.cookies();
    }

    public URLConnection getConnection() throws IOException {
        String imgUrl = "https://ssl.ptlogin2.qq.com/ptqrshow?appid=549000912&e=2&l=M&s=3&d=72&v=4&t=0." + numberService.get16int() + "&daid=5&pt_3rd_aid=0";
        URL url = new URL(imgUrl);
        return url.openConnection();
    }

    public String getQrsig(URLConnection urlConnection) throws IOException {
        URLConnection openConnection = urlConnection;
        Map<String, List<String>> headerFields = openConnection.getHeaderFields();
        String[] split = headerFields.get("Set-Cookie").get(0).split(";");
        String qrsig = "";
        for (String s : split) {
            String[] split1 = s.split("=");
            if ("qrsig".equals(split1[0]) && split1.length > 1) {
                qrsig = split1[1];
                break;
            }
        }
        return qrsig;
    }

    public URLConnection getExamine(String ptqrtoken, String datetime, String login_sig, String cookie) throws IOException {
        String ptlogin = "https://ssl.ptlogin2.qq.com/ptqrlogin?u1=https%3A%2F%2Fqzs.qzone.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone" +
                "&ptqrtoken=" + ptqrtoken +
                "&ptredirect=0&h=1&t=1&g=1&from_ui=1&ptlang=2052" +
                "&action=0-0-" + datetime +
                "&js_ver=21073010&js_type=1" +
                "&login_sig=" + login_sig +
                "&pt_uistyle=40&aid=549000912&daid=5&";
        URL url = new URL(ptlogin);
        URLConnection urlConnection = url.openConnection();
        urlConnection.setRequestProperty("cookie", cookie);
        Map<String, List<String>> headerFields1 = urlConnection.getHeaderFields();
        String HTTP = headerFields1.get(null).get(0);
        if (HTTP.contains("200")) {
            urlConnection.connect();
            return urlConnection;
        }
        return null;
    }

    public <T, Q> String mapToString(Map<T, Q> map) {
        String cookie = "";
        for (Map.Entry<T, Q> m : map.entrySet()) {
            cookie += m.getKey() + "=" + m.getValue() + "; ";
        }
        return cookie;
    }

    public String getBase64img(URLConnection urlConnection) throws IOException {
        InputStream inputStream = urlConnection.getInputStream();
        Base64 base64 = new Base64();
        return base64.encodeToString(inputStream.readAllBytes());
    }

    public String getContent(URLConnection urlConnection) throws UnsupportedEncodingException, IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "utf-8"));
        String str = "";
        String s = null;
        while ((s = br.readLine()) != null) {
            str += s;
        }
        return str;
    }

    public String getUrlContent(String ptqrtoken, String datetime, String login_sig, String cookie) throws IOException {
        URLConnection examine = getExamine(ptqrtoken, datetime, login_sig, cookie);
        if (examine != null)
            return getContent(examine);
        else
            return null;
    }

    public String dictToJson(String dict) {
        if (dict == null)
            return null;
        dict = dict.replaceAll(" ", "");
        List<String> list = new ArrayList<String>();
        String[] split1 = dict.substring(7, dict.length() - 1).split(",");
        for (int i = 0; i < split1.length; i++)
            list.add(split1[i].substring(1, split1[i].length() - 1));
        return JSON.toJSONString(list);
    }

    public String jsonToMessage(String json) {
        if (json == null)
            return null;
        JSONArray objects = JSON.parseArray(json);
        Object o = objects.get(0);
        if ("65".equals(o))
            return "二维码已失效";
        else if ("66".equals(o))
            return "二维码未失效";
        else if ("67".equals(o))
            return "二维码认证中";
        else if ("68".equals(o))
            return "本次登录已被拒绝";
        else if ("0".equals(o))
            return (String) objects.get(3);
        return null;
    }

    public int hash33(String qrsig) {
        int ptqrtoken = 0;
        for (int i = 0; i < qrsig.length(); i++)
            ptqrtoken += (ptqrtoken << 5) + qrsig.charAt(i);
        return ptqrtoken &= 0x7fffffff;
    }

    public int getGTK(String str) {
        int hash = 5381;
        for (int i = 0, len = str.length(); i < len; ++i)
            hash += (hash << 5) + str.charAt(i);
        return hash & 2147483647;
    }

    public String getQzoneLogin(InputStream is, String pass, String salt, String verifycode) throws IOException, ScriptException, NoSuchMethodException {
        ScriptEngineManager sem = new ScriptEngineManager();
        ScriptEngine se = sem.getEngineByName("javascript");
        byte[] bytes = new byte[1024];
        int len = 0;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        while ((len = is.read(bytes)) != -1) {
            bos.write(bytes, 0, len);
        }
        bos.close();
        String tempString = new String(bos.toByteArray());
        se.eval(tempString);
        Invocable inv = (Invocable) se;
        return (String) inv.invokeFunction("entry", pass, salt, verifycode);
    }
}
