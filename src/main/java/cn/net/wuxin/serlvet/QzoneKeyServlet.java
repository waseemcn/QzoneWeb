package cn.net.wuxin.serlvet;

import cn.net.wuxin.service.QzoneKeyService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Jsoup;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Map;

/**
 * 登录成功 存Cookies到客户端
 **/
@WebServlet(name = "QzoneKeyServlet", value = "/qzone/key")
public class QzoneKeyServlet extends HttpServlet {
    QzoneKeyService qzoneKeyService = new QzoneKeyService();
    Map<String, String> mapCookies = null;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        String cookies = request.getParameter("cookies");
        String url = request.getParameter("url");
        Integer type = 0;
        type = Integer.valueOf(request.getParameter("type"));
        Connection connect = Jsoup.connect(url);
        Map<String, String> cookieToMap = null;
        if (type == 0)
            cookieToMap = qzoneKeyService.getCookieToMap(cookies);
        else
            cookieToMap = JSON.parseObject(cookies, Map.class);
        connect.cookies(cookieToMap);
        Connection.Response execute = connect.execute();
        mapCookies = execute.cookies();
        JSONObject json = null;
        String p_skey = mapCookies.get("p_skey");
        String g_tk = String.valueOf(qzoneKeyService.getSKey(p_skey));
        json = qzoneKeyService.getMapToJSONObject(mapCookies);
        Cookie cookieG_tk = null;
        Cookie uin = null;
        Cookie cookie = null;
//        request.getSession().setAttribute("loginInfo", json);
        if (mapCookies.size() != 0) {
            cookieG_tk = new Cookie("g_tk", g_tk.toString());
            cookieG_tk.setPath("/");
            uin = new Cookie("uin", mapCookies.get("uin").substring(1));
            uin.setPath("/");
            cookie = new Cookie("cookies", URLEncoder.encode(JSON.toJSONString(json), "UTF-8"));
            cookie.setPath("/");
            json.put("g_tk", g_tk);
            response.addCookie(cookieG_tk);
            response.addCookie(uin);
            response.addCookie(cookie);
        }
        response.getWriter().append(JSON.toJSONString(json));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
