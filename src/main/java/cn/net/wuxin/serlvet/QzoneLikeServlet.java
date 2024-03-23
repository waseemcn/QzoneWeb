package cn.net.wuxin.serlvet;

import cn.net.wuxin.service.QzoneKeyService;
import org.jsoup.Connection;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

/**
 * 点赞功能  do（点赞）  un（取消点赞）
 * **/
@WebServlet(name = "QzoneLikeServlet", value = "/qzone/my/like")
public class QzoneLikeServlet extends HttpServlet {
    QzoneKeyService qzoneKeyService = new QzoneKeyService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        String uin = request.getParameter("uin");
        String g_tk = request.getParameter("g_tk");
        String strCookies = request.getParameter("cookies");
        String zuin = request.getParameter("zuin");
        String appid = request.getParameter("appid");
        String abstime = request.getParameter("abstime");
        String fid = request.getParameter("fid");
        // dolike(点赞)  unlike(取消点赞)   do un
        String like = request.getParameter("like");
//                   https://user.qzone.qq.com/proxy/domain/w.qzone.qq.com/cgi-bin/likes/internal_unlike_app?g_tk=;
        String url = "https://user.qzone.qq.com/proxy/domain/w.qzone.qq.com/cgi-bin/likes/internal_" + like + "like_app?g_tk=" + g_tk;
        Connection connection = qzoneKeyService.getConnection(url, strCookies);
        connection.method(Connection.Method.POST);
        connection.data("qzreferrer", "https://user.qzone.qq.com/" + uin);
        connection.data("opuin", uin);
        String key = "http://user.qzone.qq.com/" + zuin + "/mood/" + fid;
        connection.data("unikey", key);
        connection.data("curkey", key);
        connection.data("from", "1");
        connection.data("appid", appid);
        connection.data("typeid", "0");
        connection.data("abstime", abstime);
        connection.data("fid", fid);
        connection.data("active", "0");
        connection.data("fupdate", "1");
        Connection.Response execute = connection.execute();
        String body = execute.body();
//        System.out.println(body);
//        System.out.println();
        response.getWriter().append(body);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
