<%--
  Created by IntelliJ IDEA.
  User: WuXin
  Date: 2021/8/30
  Time: 0:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta name="referrer" content="never">
    <title>功能页面</title>
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/jquery.cookie-1.4.1.min.js"></script>

    <script>
        function getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        }

        function getTalk() {
            let uin = $.cookie('uin');
            let g_tk = $.cookie('g_tk');
            let cookies = $.cookie('cookies');
            $.ajax({
                url: "<%= request.getContextPath()%>/qzone/my/talk",
                data: {
                    uin: uin,
                    g_tk: g_tk,
                    cookies: cookies
                },
                success: function (result) {
                    if (result.message == "need login") {
                        window.location.href = '<%= request.getContextPath()%>/?id=1';
                        return;
                    }
                    // console.log(result)
                    // let data = result.data.data;
                    // var str = "";
                    // for (let i = 0; i < data.length; i++) {
                    //     if (data[i] != null) {
                    //         // str += "<h5><img src=\"https://q1.qlogo.cn/g?b=qq&nk="+data[i].uin+"&s=0\" width='50'><br>名字:" + data[i].nickname + "<br>UID:" + data[i].uin + "<br>发送时间:"+data[i].feedstime+"</h5>";
                    //         str += "<div class='info'>"
                    //             + data[i].html + "</div>";
                    //     }
                    // }
                    // $("#message").html(str);
                    $.ajax({
                        url: "<%= request.getContextPath()%>/qzone/my/talk",
                        method: "POST",
                        data: {
                            message: JSON.stringify(result),
                        },

                        success: function (mess) {
                            console.log(mess)
                            let str = "<h1>空间说说列表</h1>";
                            for (let i = 0; i < mess.length; i++) {
                                let imgs = "";
                                for (let j = 0; j < mess[i].imgs.length; j++) {
                                    imgs += "<img src='" + mess[i].imgs[j].img + "'>";
                                }
                                str += "<a href=\"" + mess[i].userHome + "\" target=\"_blank\">" +
                                    "<img src=\"" + mess[i].logimg + "\" /></a>" +
                                    "<br><a target=\"_blank\" href=\"" + mess[i].userHome + "\">" + mess[i].nickname + "</a>" + "&nbsp" + mess[i].feedstime +
                                    "<br><br>" + mess[i].info +
                                    "<br>" + imgs +
                                    "<br><br>" + mess[i].browseNumber +
                                    "<br>" + mess[i].userList +
                                    "<br><input type=\"submit\" state=\"do\" id=\"like\" zuin=\"" + mess[i].opuin + "\" appid=\"" + mess[i].appid + "\" abstime=\"" + mess[i].abstime + "\" fid=\"" + mess[i].key + "\" value=\"点赞\" /><input type=\"submit\" state=\"un\" id=\"like\" zuin=\"" + mess[i].opuin + "\" appid=\"" + mess[i].appid + "\" abstime=\"" + mess[i].abstime + "\" fid=\"" + mess[i].key + "\" value=\"取消点赞\" />" +
                                    "</form>" +
                                    "<br>" + mess[i].commentsList +
                                    "<br><br><br>";
                            }
                            $("#message").html(str);
                        }
                    });
                }
            });
        }

        $(function () {
            $("input[name='talk']").click(function () {
                getTalk();
            });

            $("body").on("click", "#like", function () {
                let uin = $.cookie('uin');
                let g_tk = $.cookie('g_tk');
                let cookies = $.cookie('cookies');
                let zuin = $(this).attr("zuin");
                let appid = $(this).attr("appid");
                let abstime = $(this).attr("abstime");
                let fid = $(this).attr("fid");
                let state = $(this).attr("state");
                $.ajax({
                    url: "<%= request.getContextPath()%>/qzone/my/like",
                    data: {
                        uin: uin,
                        g_tk: g_tk,
                        cookies: cookies,
                        zuin: zuin,
                        appid: appid,
                        abstime: abstime,
                        fid: fid,
                        like: state
                    },
                    success: function (result) {
                        console.log(result)
                        getTalk();
                    }
                });
            });

            $("input[name='noAccess']").click(function () {
                let uin = $.cookie('uin');
                let g_tk = $.cookie('g_tk');
                let cookies = $.cookie('cookies');
                $.ajax({
                    url: "<%= request.getContextPath()%>/qzone/my/noaccess",
                    data: {
                        uin: uin,
                        g_tk: g_tk,
                        cookies: cookies
                    },
                    success: function (result) {
                        <%--if (result.message == "need login") {--%>
                        <%--    window.location.href = '<%= request.getContextPath()%>/?id=1';--%>
                        <%--    return;--%>
                        <%--}--%>
                        console.log(result)
                        let data = result.data;
                        let qzoneVip = result.data.qzone_vip;
                        if (qzoneVip == 0) {
                            console.log("<h1>你不是VIP无法查看</h1>");
                            $("#message").html("<h1>你不是VIP无法查看</h1>");
                            return;
                        }
                        let items = data.items;
                        let str = "<h1>被挡访客</h1>";
                        for (let i = 0; i < items.length; i++) {
                            str += "<img src='" + items[i].img + "'>" +
                                "<a href='https://user.qzone.qq.com/" + items[i].uin + "/main'>" + items[i].name + "</a>&nbsp;" + getLocalTime(items[i].time) + "<br><br>";
                        }
                        $("#message").html(str);
                    }
                });
            });

            $("input[name='messageBoard']").click(function () {
                let uin = $.cookie('uin');
                let g_tk = $.cookie('g_tk');
                let cookies = $.cookie('cookies');
                $.ajax({
                    url: "<%= request.getContextPath()%>/qzone/my/message/board",
                    data: {
                        uin: uin,
                        g_tk: g_tk,
                        cookies: cookies
                    },
                    success: function (result) {
                        <%--if (result.message == "need login") {--%>
                        <%--    window.location.href = '<%= request.getContextPath()%>/?id=1';--%>
                        <%--    return;--%>
                        <%--}--%>
                        let commentList = result.data.commentList;
                        let str = "<h1>留言板</h1>";
                        for (let i = 0; i < commentList.length; i++) {
                            console.log(commentList[i])
                            // console.log(commentList[i].htmlContent)
                            str += "<a href='https://user.qzone.qq.com/" + commentList[i].uin + "/main'>" + commentList[i].nickname + "</a>&nbsp;" +
                                commentList[i].pubtime +
                                "<p>" + commentList[i].htmlContent + "</p>";
                            for (let j = 0; j < commentList[i].replyList.length; j++) {
                                str += "<h5>" + commentList[i].replyList[j].uin + "回复</h5>" +
                                    commentList[i].replyList[j].content;
                            }
                        }

                        $("#message").html(JSON.stringify(str));
                        let a = $("a");
                        for (let i = 0; i < a.length; i++) {
                            let val = $(a).eq(i).attr("href");
                            let replace = val.replace(RegExp('\\"', "g"), "").replace(/\\/g, "");
                            $(a).eq(i).attr("href", replace);
                        }
                        let img = $("img");
                        for (let i = 0; i < img.length; i++) {
                            let val = $(img).eq(i).attr("src");
                            let replace = val.replace(RegExp('\\"', "g"), "").replace(/\\/g, "");
                            $(img).eq(i).attr("src", replace);
                        }
                    }
                });
            });

            $("input[name='friends']").click(function () {
                let uin = $.cookie('uin');
                let g_tk = $.cookie('g_tk');
                let cookies = $.cookie('cookies');
                $.ajax({
                    url: "<%= request.getContextPath()%>/qzone/my/friends",
                    data: {
                        uin: uin,
                        g_tk: g_tk,
                        cookies: cookies
                    },
                    success: function (result) {
                        <%--if (result.message == "need login") {--%>
                        <%--    window.location.href = '<%= request.getContextPath()%>/?id=1';--%>
                        <%--    return;--%>
                        <%--}--%>
                        console.log(result)
                        let data = result.data;
                        let gpnames = data.gpnames;
                        let items = data.items;
                        let qqgroup = data.qqgroup;
                        let str = "<h3>好友分组列表:" + gpnames.length + "个&nbsp;好友:" + items.length + "个&nbsp;群:" + qqgroup.length + "个</h3>";
                        str += "<h1>好友分组列表</h1>";
                        for (let i = 0; i < gpnames.length; i++) {
                            str += "<li gpid=\"" + gpnames[i].gpid + "\">" + gpnames[i].gpname + "</li>";
                        }
                        str += "<h1>好友列表</h1>";
                        for (let i = 0; i < items.length; i++) {
                            str += "<li groupid=\"" + items[i].groupid + "\" uin=\"" + items[i].uin + "\" >" + "" +
                                "<img src='" + items[i].img + "'>" + items[i].name + "(" + items[i].remark + ")</li>";
                        }
                        str += "<h1>群列表</h1>";
                        for (let i = 0; i < qqgroup.length; i++) {

                            let gId = qqgroup[i].group_id;
                            imgStr = "https://p.qlogo.cn/gh/"+ gId +"/" + gId + "/100";
                            //qqgroup[i].group_pic
                            str += "<li group_id=\"" + qqgroup[i].group_id + " >" +
                                "<img src='" + imgStr + "'>" + qqgroup[i].group_name + "</li>";
                        }
                        $("#message").html(str);
                    }
                });
            });
        });
    </script>
</head>
<body>
<!-- 暂无功能 -->
<a href="<%= request.getContextPath()%>/">首页</a>
<input type="button" name="talk" value="查看空间说说列表">
<input type="button" name="noAccess" value="查看被挡访客">
<input type="button" name="messageBoard" value="查看留言板">
<input type="button" name="friends" value="查看好友/群">
<div id="message"></div>
</body>
</html>
