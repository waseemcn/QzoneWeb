package cn.net.wuxin.serlvet;

import cn.net.wuxin.service.QzoneService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URLConnection;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 登录检索
 * **/
@WebServlet(name = "QzoneExamineServlet", value = "/qzone/examine")
public class QzoneExamineServlet extends HttpServlet {
    QzoneService qzoneService = new QzoneService();
    String login_sig = null;
    String ptqrtoken = null;
    String cookies = null;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        HttpSession session = request.getSession();
        ptqrtoken = (String) session.getAttribute("ptqrtoken");
        cookies = (String) session.getAttribute("cookies");
        login_sig = (String) session.getAttribute("login_sig");
        String img = (String) session.getAttribute("img");
        Date date = new Date();
        String dateTime = String.valueOf(date.getTime() * 100);
        URLConnection examine = qzoneService.getExamine(ptqrtoken, dateTime, login_sig, cookies);
        String content = null;
        Map<String, List<String>> headerFields = null;
        JSONObject jsonObject = new JSONObject();
        if (examine != null) {
            content = qzoneService.getContent(examine);
            headerFields = examine.getHeaderFields();
            List<String> strings = headerFields.get("Set-Cookie");
            if (strings != null)
                jsonObject.put("cookies", strings);
//            System.out.println(strings);
        }
        jsonObject.put("img", img);
//        System.out.println(content);
        jsonObject.put("urlContent", JSON.parseArray(qzoneService.dictToJson(content)));
        response.getWriter().append(JSON.toJSONString(jsonObject));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}