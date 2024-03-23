package cn.net.wuxin.serlvet;

import cn.net.wuxin.service.QzoneKeyService;
import org.jsoup.Connection;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

/**
 * 获取好友 群 分组列表
 **/
@WebServlet(name = "QzoneFriendsServlet", value = "/qzone/my/friends")
public class QzoneFriendsServlet extends HttpServlet {
    QzoneKeyService qzoneKeyService = new QzoneKeyService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        String uin = request.getParameter("uin");
        String g_tk = request.getParameter("g_tk");
        String strCookies = request.getParameter("cookies");
        String url = "https://user.qzone.qq.com/proxy/domain/r.qzone.qq.com/cgi-bin/tfriend/friend_show_qqfriends.cgi?uin=" + uin + "&follow_flag=0&groupface_flag=1&fupdate=1&g_tk=" + g_tk;
        Connection connection = qzoneKeyService.getConnection(url, strCookies);
        connection.ignoreContentType(true);
        response.getWriter().append(qzoneKeyService.connectExecute(connection));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
