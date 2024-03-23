package cn.net.wuxin.serlvet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.Map;

/**
 * 空间说说列表
 * **/
@WebServlet(name = "QzoneMyTalkServlet", value = "/qzone/my/talk")
public class QzoneMyTalkServlet extends HttpServlet {
    public static final String href = "src";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        String message = request.getParameter("message");
        if (message != null) {
            // System.out.println("将json转为可读性");
            JSONObject jsonObject = JSON.parseObject(message);
            String s = JSON.toJSONString(jsonObject.get("data"));
            jsonObject = JSON.parseObject(s);
            s = JSON.toJSONString(jsonObject.get("data"));
            JSONArray jsonArray = JSON.parseArray(s);
            JSONArray jsons = new JSONArray();
            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject json = new JSONObject();
                JSONObject jsonObject1 = jsonArray.getJSONObject(i);
                if (jsonObject1 != null) {
                    Object nickname = jsonObject1.get("nickname");
                    String uin = (String) jsonObject1.get("uin");
                    if ("20050606".equals(uin))
                        continue;
                    Object logimg = jsonObject1.get("logimg");
                    Object userHome = jsonObject1.get("userHome");
                    Object feedstime = jsonObject1.get("feedstime");
                    Object opuin = jsonObject1.get("opuin");
                    Object appid = jsonObject1.get("appid");
                    Object key = jsonObject1.get("key");
                    Object abstime = jsonObject1.get("abstime");
                    json.put("nickname", nickname);
                    json.put("uin", uin);
                    json.put("logimg", logimg);
                    json.put("userHome", userHome);
                    json.put("feedstime", feedstime);
                    json.put("opuin", opuin);
                    json.put("appid", appid);
                    json.put("key", key);
                    json.put("abstime", abstime);
                    Document html = Jsoup.parse(jsonObject1.get("html").toString().trim());
                    // 内容
                    String info = html.select(".f-info").html();
                    json.put("info", info);
                    // 签名
                    String sign = html.select(".f-sign-show.state").html();
                    json.put("sign", sign);
                    // 浏览次数
                    String browseNumber = html.select(".state.qz_feed_plugin").html();
                    json.put("browseNumber", browseNumber);
//                    // 赞
//                    Elements praise = html.select(".item.q_namecard");
//                    JSONArray praises = new JSONArray();
//                    for (int j = 0; j < praise.size(); j++) {
//                        JSONObject praiseJson = new JSONObject();
//                        praiseJson.put("userHome", praise.get(j).attr("href"));
//                        praiseJson.put("userName", praise.get(j).html());
//                        praises.add(praiseJson);
//                    }
//                    json.put("praises", praises);
//                    // 赞的人数
//                    String praiseNumber = html.select(".f-like-cnt").html();
//                    json.put("praiseNumber", praiseNumber);
                    // 赞
                    String userList = html.select(".user-list").html();
                    json.put("userList", userList);
                    // 评论
                    String commentsList  = html.select(".comments-list ").html();
                    json.put("commentsList", commentsList);
                    // 图片
                    Elements img = html.select(".img-item").select("img");
                    JSONArray imgs = new JSONArray();
                    for (int j = 0; j < img.size(); j++) {
                        JSONObject imgJson = new JSONObject();
                        imgJson.put("img", img.get(j).attr("src"));
                        imgs.add(imgJson);
                    }
                    json.put("imgs", imgs);
                    jsons.add(json);
                }
            }
//            http://a1.qpic.cn/psc?/V11x5K7z493158/8v1cnOdZLSE3kzDE6fnRyvdpuXr6qqWJSZS6gB08xZQB95q6FMA8BXsmWVthp8WvQlD5ZdfzfOgLgo9ccHzNrxWDsupyUnpuJ1TqLb0dUXo!/c&amp;ek=1&amp;kp=1&amp;pt=0&amp;bo=gAKAAoACgAIRADc!&amp;tl=1&amp;vuin={此处QQ}&amp;tm=1630274400&amp;sce=60-2-2&amp;rf=0-0
//            http://a1.qpic.cn/psc?/V11x5K7z493158/8v1cnOdZLSE3kzDE6fnRyvdpuXr6qqWJSZS6gB08xZQB95q6FMA8BXsmWVthp8WvQlD5ZdfzfOgLgo9ccHzNrxWDsupyUnpuJ1TqLb0dUXo!/c&amp;ek=1&amp;kp=1&amp;pt=0&amp;bo=gAKAAoACgAIRADc!&amp;tl=3&amp;vuin={此处QQ}&amp;tm=1630274400&amp;sce=60-2-2&amp;rf=0-0
            response.getWriter().append(JSON.toJSONString(jsons));
        } else {
            // System.out.println("获取说说为json");
            String uin = request.getParameter("uin");
            String g_tk = request.getParameter("g_tk");
            String strCookies = request.getParameter("cookies");
            String url = "https://user.qzone.qq.com/proxy/domain/ic2.qzone.qq.com/cgi-bin/feeds/feeds3_html_more?uin=" + uin + "&g_tk=" + g_tk;

            JSONObject loginInfo = JSON.parseObject(strCookies);
//            JSONObject loginInfo = (JSONObject) request.getSession().getAttribute("loginInfo");
            Map<String, String> cookies = null;
            cookies = JSON.parseObject(JSON.toJSONString(loginInfo), Map.class);
            Connection connect = Jsoup.connect(url);
            connect.ignoreContentType(true);
            if (cookies != null)
                connect.cookies(cookies);
            Connection.Response execute = connect.execute();
            String body = execute.body();
            body = body.substring(10, body.length() - 2);
            JSONObject jsonObject = JSON.parseObject(body);
            response.getWriter().append(JSON.toJSONString(jsonObject));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
