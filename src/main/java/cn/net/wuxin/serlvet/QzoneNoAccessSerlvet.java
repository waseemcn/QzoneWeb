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
 * 被挡访客
 * **/
@WebServlet(name = "QzoneNoAccessSerlvet", value = "/qzone/my/noaccess")
public class QzoneNoAccessSerlvet extends HttpServlet {
    QzoneKeyService qzoneKeyService = new QzoneKeyService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        String uin = request.getParameter("uin");
        String g_tk = request.getParameter("g_tk");
        String strCookies = request.getParameter("cookies");
        String url = "https://rc.qzone.qq.com/proxy/domain/g.qzone.qq.com/cgi-bin/friendshow/cgi_get_visitor_simple?uin=" + uin + "&clear=1&mask=7&mod=8&fupdate=1&g_tk=" + g_tk + "&g_tk=" + g_tk;
        Connection connection = qzoneKeyService.getConnection(url, strCookies);
        response.getWriter().append(qzoneKeyService.connectExecute(connection));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
