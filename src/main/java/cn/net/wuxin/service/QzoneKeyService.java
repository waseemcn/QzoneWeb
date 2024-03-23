package cn.net.wuxin.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Jsoup;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class QzoneKeyService {

    public Map<String, String> getCookieToMap(String cookies) {
        Map<String, String> map = new HashMap<String, String>();
        JSONArray jsons = JSON.parseArray(cookies);
        for (int i = 0; i < jsons.size(); i++) {
            String[] split = jsons.get(i).toString().split(";");
            for (String s : split) {
                String[] split1 = s.split("=");
                if (split1.length == 2)
                    map.put(split1[0], split1[1]);
                else
                    map.put(split1[0], "");
            }
        }
        return map;
    }

    public Integer getSKey(String str) {
        if (str == null)
            return 0;
        int hash = 5381;
        for (int i = 0, len = str.length(); i < len; ++i) {
            hash += (hash << 5) + str.charAt(i);
        }
        return hash & 0x7fffffff;
    }

    public <T, Q> JSONObject getMapToJSONObject(Map<T, Q> map) {
        JSONObject json = new JSONObject();
        for (Map.Entry<T, Q> set : map.entrySet()) {
            json.put((String) set.getKey(), set.getValue());
        }
        return json;
    }

    public Connection getConnection(String url, String Cookies) {
        JSONObject loginInfo = JSON.parseObject(Cookies);
        Map<String, String> cookies = null;
        cookies = JSON.parseObject(JSON.toJSONString(loginInfo), Map.class);
        Connection connect = Jsoup.connect(url);
        if (cookies != null)
            connect.cookies(cookies);
        return connect;
    }

    public String connectExecute(Connection connect) throws IOException {
        Connection.Response execute = connect.execute();
        String body = execute.body();
        body = body.substring(10, body.length() - 2);
        JSONObject jsonObject = JSON.parseObject(body);
        return JSON.toJSONString(jsonObject);
    }
}
