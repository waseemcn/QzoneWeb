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
import java.util.Map;

/**
 * 访客设置 状态：公开 朋友 自己
 * 电脑端 官方API 已失效
 * **/
@WebServlet(name = "QzoneVisitorSetServlet", value = "/qzone/my/set/visitor")
public class QzoneVisitorSetServlet extends HttpServlet {
    QzoneKeyService qzoneKeyService = new QzoneKeyService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        // no(自己) all(所有人) friends(好友/朋友)
        String guestshow = request.getParameter("guestshow");
        String uin = request.getParameter("uin");
        String g_tk = request.getParameter("g_tk");
        String strCookies = request.getParameter("cookies");
        String url = "https://user.qzone.qq.com/proxy/domain/b.qzone.qq.com/cgi-bin/blognew/blog_set_bitmap?&g_tk=" + g_tk;
        Connection connect = qzoneKeyService.getConnection(url, strCookies);
        connect.data("uin", uin);
        connect.data("guestshow", guestshow);
        connect.data("qzreferrer", "https://user.qzone.qq.com/" + uin + "/friendvisitor");
        Connection.Response execute = connect.execute();
        String body = execute.body();
//        System.out.println(body);
//        System.out.println();
        response.getWriter().append(body);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
