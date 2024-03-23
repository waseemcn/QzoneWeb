package cn.net.wuxin.serlvet;

import cn.net.wuxin.service.QzoneService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.net.URLConnection;
import java.util.Date;
import java.util.Map;


/**
 * 扫描登录
 * **/
@WebServlet(name = "QzoneServlet", value = "/qzone")
public class QzoneServlet extends HttpServlet {
    QzoneService qzoneService = new QzoneService();
    Map<String, String> mapCookies = null;
    String login_sig = null;
    String ptqrtoken = null;

    //ptuiCB('65','0','','0','二维码已失效。(1493179568)', '')
    //ptuiCB('66','0','','0','二维码未失效。(3448770776)', '')
    //ptuiCB('67','0','','0','二维码认证中。(503323587)', '')
    //ptuiCB('68','0','','0','本次登录已被拒绝', '')
    //ptuiCB('0','0',' 登录成功链接 ','0','登录成功！', 'Waseem')

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        mapCookies = qzoneService.getLoginSig();
        login_sig = mapCookies.get("pt_login_sig");
        URLConnection connection = qzoneService.getConnection();
        String qrsig = qzoneService.getQrsig(connection);
        ptqrtoken = String.valueOf(qzoneService.hash33(qrsig));
        Date date = new Date();
        String dateTime = String.valueOf(date.getTime() * 100);
        mapCookies.put("qrsig", qrsig);
        String cookies = qzoneService.mapToString(mapCookies);
        String urlContent = qzoneService.getUrlContent(ptqrtoken, dateTime, login_sig, cookies);
        String img = "data:image/png;base64," + qzoneService.getBase64img(connection);
        HttpSession session = request.getSession();
        session.setMaxInactiveInterval(60 * 5);
        session.setAttribute("cookies", cookies);
        session.setAttribute("login_sig", login_sig);
        session.setAttribute("ptqrtoken", ptqrtoken);
        session.setAttribute("img", img);
//        request.getRequestDispatcher("/WEB-INF/Qzone.jsp").forward(request, response);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("img", img);
        jsonObject.put("urlContent", JSON.parseArray(qzoneService.dictToJson(urlContent)));
        response.getWriter().append(JSON.toJSONString(jsonObject));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}

//        Cookie cookie = new Cookie("cookies", cookies);
//        Cookie sig = new Cookie("login_sig", login_sig);
//        Cookie token = new Cookie("ptqrtoken", ptqrtoken);
//        cookie.setMaxAge(60 * 60 * 24);
//        sig.setMaxAge(60 * 60 * 24);
//        token.setMaxAge(60 * 60 * 24);
//        response.addCookie(cookie);
//        response.addCookie(sig);
//        response.addCookie(token);
//        response.setHeader("Set-Cookie", "cookies=" + cookies);
//        response.setHeader("Set-Cookie", "login_sig=" + login_sig);
//        response.setHeader("Set-Cookie", "ptqrtoken=" + ptqrtoken);
