package cn.net.wuxin.serlvet;

import cn.net.wuxin.service.QzoneKeyService;
import org.jsoup.Connection;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "QzoneMessageBoardServlet", value = "/qzone/my/message/board")
public class QzoneMessageBoardServlet extends HttpServlet {
    QzoneKeyService qzoneKeyService = new QzoneKeyService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        String uin = request.getParameter("uin");
        String g_tk = request.getParameter("g_tk");
        String strCookies = request.getParameter("cookies");
        String url = "https://user.qzone.qq.com/proxy/domain/m.qzone.qq.com/cgi-bin/new/get_msgb?uin=" + uin + "&hostUin=" + uin + "&start=0&s=0.050622164762954336&format=jsonp&num=10&inCharset=utf-8&outCharset=utf-8&g_tk=" + g_tk;
        Connection connection = qzoneKeyService.getConnection(url, strCookies);
        connection.ignoreContentType(true);
        response.getWriter().append(qzoneKeyService.connectExecute(connection));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
