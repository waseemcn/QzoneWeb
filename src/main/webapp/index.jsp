<%--
  Created by IntelliJ IDEA.
  User: WuXin
  Date: 2021/8/5
  Time: 19:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page isELIgnored="false" contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta name="referrer" content="never">
    <title>首页</title>
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/jquery.cookie-1.4.1.min.js"></script>
    <script>
        function create(message) {
            $.ajax({
                url: "<%= request.getContextPath()%>/qzone",
                success: function (result) {
                    var urlContent = result.urlContent;
                    $("#message").html(message + " <img src=\"" + result.img + "\" alt=\"二维码\"><br>" + urlContent[4]);
                    $("#login").hide();
                }
            });
        }

        function getSkey(cookies, url, type) {
            $.ajax({
                url: "<%= request.getContextPath()%>/qzone/key",
                data: {
                    "cookies": JSON.stringify(cookies),
                    "url": url,
                    "type": type
                },
                success: function (result) {
                    console.log(result);
                    window.location.href = '<%= request.getContextPath()%>/home.jsp';
                }
            });
        }

        function js_showLogin() {
            $('#login').show();
            $('#message').html("");
        }

        function examine(message) {
            $.ajax({
                url: "<%= request.getContextPath()%>/qzone/examine",
                success: function (result) {
                    if ($.isEmptyObject(result)) {
                        // var date = new Date();
                        // $("#message").html("请先创建二维码。(" + date.getTime() + ")");
                        create(message);
                        return;
                    }
                    var urlContent = result.urlContent;
                    var cookies = result.cookies;
                    $("#message").html(" <img src=\"" + result.img + "\" alt=\"二维码\"><br>" + urlContent[4]);
                    if (urlContent[0] == "0") {
                        getSkey(cookies, urlContent[2], 0);
                    } else if (urlContent[0] == "65")
                        create(message);
                    $("#login").hide();
                }
            });
        }

        $(function () {
            String.prototype.getQueryString = function (name) {
                var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)"), r;
                if (r = this.match(reg)) return unescape(r[2]);
                return null;
            };
            var sId = location.search.getQueryString("id");
            if (sId == 1) {
                examine("<h3>请先登录！</h3>");
            }

            $("input[name='create']").click(function () {
                create("");
            });
            $("input[name='examine']").click(function () {
                examine("")
            });
            $("body").on("click", "#sKey", function () {
                let cookies = JSON.parse($("#cookies").text());
                let url = $("#url").text();
                getSkey(cookies, url, 0);
            });
            $("input[type='submit'][value='登录']").click(function () {
                let name = $("input[name='name']").val();
                let password = $("input[name='password']").val();
                $.ajax({
                    url: "<%= request.getContextPath()%>/qzone/login",
                    data: {
                        "name": name,
                        "password": password,
                    },
                    success: function (result) {
                        console.log(result);
                        if (result.state == 1) {
                            create("<h1>异地登录，请扫码登录！</h1>");
                            $("#login").hide();
                            return;
                        }
                        var urlContent = result.urlContent;
                        var cookies = result.cookies;
                        if (urlContent[0] == "0")
                            getSkey(cookies, urlContent[2], 1);
                        else if (urlContent[0] == "3")
                            $("#message").html(urlContent[4]);
                    }
                });
            });
        });
    </script>
</head>
<body>
<input type="button" name="create" value="创建二维码">
<input type="button" name="examine" value="检查状态">
<input type="button" value="账号密码登录" onclick='javascript:js_showLogin();'>
<input type="button" value="功能..." onclick="javascript:window.location.href='<%= request.getContextPath()%>/home.jsp';">

<div id="message"></div>
<%--<form action="<%= request.getContextPath()%>/qzone/login" method="post">--%>
<div id="login">
    账号：<input name="name" type="text"><br>
    密码：<input name="password" type="password"><br>
    <input type="submit" value="登录">
</div>
<%--</form>--%>
</body>
</html>
