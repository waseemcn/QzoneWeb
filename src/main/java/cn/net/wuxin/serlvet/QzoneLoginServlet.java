package cn.net.wuxin.serlvet;

import cn.net.wuxin.service.QzoneService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Jsoup;

import javax.script.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.*;
import java.net.CookieStore;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "QzoneLoginServlet", value = "/qzone/login")
public class QzoneLoginServlet extends HttpServlet {
    QzoneService qzoneService = new QzoneService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        String name = request.getParameter("name");
        String pass = request.getParameter("password");
        Map<String, String> loginCookies = qzoneService.getLoginSig();
        JSONObject jsonObject = new JSONObject();
        String url = "https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea=2&pt_vcode=1&uin=" + name + "&appid=549000912&js_ver=21082415&js_type=1&login_sig=WldFotBkObvaCcohyTJAWD23B9DUClOEkA*qQ*rEgeYS-zwPZVrzXwmohDg9KvJc&u1=https%3A%2F%2Fqzs.qzone.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone&r=0.839597647327567&pt_uistyle=40";
        Connection connect = Jsoup.connect(url);
        connect.ignoreContentType(true);
        connect.cookies(loginCookies);
        Connection.Response execute = connect.execute();
        Map<String, String> cookies = execute.cookies();
        loginCookies.putAll(cookies);
        JSONArray jsonArray = JSON.parseArray(execute.body().substring(12).replace('(', '[').replace(')', ']'));
//        System.out.println(jsonArray);
        Map<String, String> exam = new HashMap<String, String>();
        exam.put("status", jsonArray.get(0).toString());
        String status = exam.get("status");
        jsonObject.put("state", 0);
        if ("1".equals(status)) {
            jsonObject.put("state", 1);
        }
        exam.put("verifycode", jsonArray.get(1).toString());
        exam.put("salt", jsonArray.get(2).toString());
        exam.put("pt_verifysession_v1", jsonArray.get(3).toString());
        exam.put("pt_randsalt", jsonArray.get(4).toString());
        exam.put("ptdrvs", jsonArray.get(5).toString());
        exam.put("sid", jsonArray.get(6).toString());
        InputStream is = this.getServletContext().getResourceAsStream("WEB-INF/js/login.js");
        try {
            pass = qzoneService.getQzoneLogin(is, pass, exam.get("salt"), exam.get("verifycode"));
        } catch (ScriptException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
        url = "https://ssl.ptlogin2.qq.com//login?u=" + name + "&verifycode=" + exam.get("verifycode") + "&pt_vcode_v1=0" +
                "&pt_verifysession_v1=" + exam.get("pt_verifysession_v1") +
                "&p=" + pass + "&pt_randsalt=2" +
                "&u1=https%3A%2F%2Fqzs.qzone.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone" +
                "&ptredirect=0&h=1&t=1&g=1&from_ui=1&ptlang=2052&action=2-13-1630440257120&js_ver=21082415&js_type=1" +
//                "&login_sig=WldFotBkObvaCcohyTJAWD23B9DUClOEkA*qQ*rEgeYS-zwPZVrzXwmohDg9KvJc" +
                "&pt_uistyle=40&aid=549000912&daid=5" +
                "&ptdrvs=" + exam.get("ptdrvs") + "&sid=" + exam.get("sid") + "&";
        connect = Jsoup.connect(url);
        connect.ignoreContentType(true);
        connect.cookies(loginCookies);
        execute = connect.execute();
        loginCookies.putAll(execute.cookies());
        jsonObject.put("urlContent", JSON.parseArray(qzoneService.dictToJson(execute.body())));
        jsonObject.put("cookies", loginCookies);
        response.getWriter().append(JSON.toJSONString(jsonObject));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
