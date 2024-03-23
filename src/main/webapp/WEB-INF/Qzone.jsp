<%@ page import="java.net.URLDecoder" %><%--
  Created by IntelliJ IDEA.
  User: WuXin
  Date: 2021/8/5
  Time: 18:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>二维码</title>
</head>
<body>
<%
    HttpSession session1 = request.getSession();
    String cookies = (String) session1.getAttribute("cookies");
    String login_sig = (String) session1.getAttribute("login_sig");
    String ptqrtoken = (String) session1.getAttribute("ptqrtoken");
    String urlContent = (String) session1.getAttribute("urlContent");
    String img = (String) session1.getAttribute("img");
    out.println("<p>cookies = " + cookies + "</p>");
    out.println("<p>login_sig = " + login_sig + "</p>");
    out.println("<p>ptqrtoken = " + ptqrtoken + "</p>");
    out.println("<p>urlContent = " + urlContent + "</p>");
    out.println("<p>img = <img src=\" " + img + " \"></p>");
%>
</body>
</html>
