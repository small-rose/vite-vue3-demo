# Vue 3 + Vite




模拟后端接口：

```xml
<!-- https://mvnrepository.com/artifact/com.squareup.okhttp3/mockwebserver -->
        <dependency>
            <groupId>com.squareup.okhttp3</groupId>
            <artifactId>mockwebserver</artifactId>
            <version>5.3.2</version>
        </dependency>
```

服务类：

```java
package com.small.rose.demo.mock;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.Data;
import lombok.Setter;
import okhttp3.HttpUrl;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import okhttp3.mockwebserver.RecordedRequest;
import okio.Buffer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Project: demo-boot3-m
 * @Author: 张小菜
 * @Description: [ MockWebServerDemo ] 说明： 基于 MockWebServer 的简单模拟后端服务 启动后会创建一个 HTTP 服务器，前端可以直接调用
 * @Function: 功能描述： 无
 * @Date: 2025/12/14 周日 16:03
 * @Version: v1.0
 */
public class MockWebServerDemo {


    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private MockWebServer  server;


    public void start() throws IOException{
        // 创建并启动服务器，端口 8080
        server = new MockWebServer();
        server.start(8080);

        System.out.println("🚀 Mock 服务器已启动!");
        System.out.println("地址: http://localhost:" + server.getPort());
        System.out.println("登录接口: POST /admin/auth/login");

        // 设置请求处理器[1,2](@ref)
        server.setDispatcher(new okhttp3.mockwebserver.Dispatcher() {
            @Override
            public MockResponse dispatch(RecordedRequest request) {
                String path = request.getPath();
                String method = request.getMethod();
                System.out.println("请求头: " + request.getHeaders());

                // 获取请求体
                String requestBody = "";
                try {
                    Buffer buffer = request.getBody();
                    if (buffer != null && buffer.size() > 0) {
                        requestBody = buffer.readUtf8();
                        System.out.println("请求体: " + requestBody);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                System.out.println("收到请求: " + method + " " + path);

                // 2. 根据请求路径和方法动态返回不同响应
                if ( path.startsWith("/admin/auth/login")) {
                    return handleLogin(requestBody);
                } else if (  path.startsWith("/admin/auth/getinfo")) {
                    return handleGetUserInfo(request);
                } else if ("POST".equals(method) && path.startsWith("/admin/auth/updatePassword")) {
                    return handleCreateOrder(request);
                } else if (path.startsWith("/admin/statics1")) {
                    return handleGetStatic1(request);
                } else if (path.startsWith("/admin/statics2")) {
                    return handleGetStatic2(request);
                } else if (path.startsWith("/admin/statics3")) {
                    return handleGetStatic3(request);
                } else {
                    // 未匹配的接口返回404
                    return new MockResponse().setResponseCode(404).setBody("{\"code\": 404, \"message\": \"接口不存在\"}");
                }
            }
        });

        // 保持服务器运行
        try {
            Thread.sleep(Long.MAX_VALUE);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            server.shutdown();
        }
    }

    /**
     * 处理登录请求
     */
    private static MockResponse handleLogin(String requestBody) {
        System.out.println("处理登录请求...");

        try {
            // 解析请求体
            Map<String, String> loginData = gson.fromJson(requestBody, Map.class);
            String username = loginData.get("username");
            String password = loginData.get("password");

            // 模拟用户验证
            if ("admin".equals(username) && "admin".equals(password)) {
                // 管理员用户
                return handleLogin();

            } else {
                // 登录失败
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("code", 500);
                errorResponse.put("message", "用户名或密码错误");
                errorResponse.put("data", null);
                errorResponse.put("timestamp", System.currentTimeMillis());

                return new MockResponse()
                        .setResponseCode(500)
                        .setBody(gson.toJson(errorResponse))
                        .setHeader("Content-Type", "application/json");
            }
        } catch (Exception e) {
            return new MockResponse().setResponseCode(400).setBody("{\"code\": 400, \"message\": \"请求参数错误\"}");
        }
    }

    // 处理登录请求
    private static MockResponse handleLogin() {
        try {

            // 解析请求体等逻辑
            // 根据不同的请求体内容，可以返回不同的结果，实现更细粒度的动态控制
            String responseBody = "{\"code\": 200, \"message\": \"登录成功\", \"data\": {\"token\": \"mock_token_12345\", \"userId\": 1}}";
            return new MockResponse()
                    .setResponseCode(200)
                    .setHeader("Content-Type", "application/json")
                    .setBody(responseBody);
        } catch (Exception e) {
            return new MockResponse().setResponseCode(400).setBody("{\"code\": 400, \"message\": \"请求参数错误\"}");
        }
    }
    // 处理获取用户信息请求
    private static MockResponse handleGetUserInfo(RecordedRequest request) {

        List<Menu> menuList = new ArrayList<>();

        Menu menu1 = new Menu("1","后台主页", "","ShoppingBag");
        List<Menu> menusList1 = new ArrayList<>();
        Menu menu11 = new Menu("11","后台主页", "/","Message");
        menusList1.add(menu11);
        menu1.setChild(menusList1);


        Menu menu2 = new Menu("2","基础资源", "","HomeFilled");
        List<Menu> menusList2 = new ArrayList<>();
        Menu menu21 = new Menu("21","图库管理", "/image/list","Picture");
        menusList2.add(menu21);
        Menu menu22 = new Menu("22","分类管理", "/category/list","Grid");
        menusList2.add(menu22);
        Menu menu23 = new Menu("23","标签管理", "/tag/list","Promotion");
        menusList2.add(menu23);
        menu2.setChild(menusList2);


        Menu menu3 = new Menu("3","商城管理", "","ShoppingCart");
        List<Menu> menusList3 = new ArrayList<>();
        Menu menu31 = new Menu("31","商品管理", "/goods/list","Goods");
        menusList3.add(menu31);
        Menu menu32 = new Menu("32","订单管理", "/order/list","Coin");
        menusList3.add(menu32);
        menu3.setChild(menusList3);

        menuList.add(menu1);
        menuList.add(menu2);
        menuList.add(menu3);

        String responseBody = "{\"code\": 200, \"data\": " +
                "{\"userId\": 1, \"username\": \"Admin\", \"avatar\": \"https://cdn.jsdelivr.net/gh/small-rose/small-rose.github.io/favicon.ico\"}" +
                " , \"menus\": "+JSON.toJSONString(menuList)+
                " ,\"role\":"+role+
                " ,\"ruleNames\":"+ruleNames+"}";
        return new MockResponse()
                .setResponseCode(200)
                .setHeader("Content-Type", "application/json")
                .setBody(responseBody);
    }

    // 处理创建订单请求
    private static MockResponse handleCreateOrder(RecordedRequest request) {
        String responseBody = "{\"code\": 200, \"message\": \"密码修改成功\", \"data\": {\"orderId\": \"ORDER_20251214_001\"}}";
        return new MockResponse()
                .setResponseCode(200)
                .setHeader("Content-Type", "application/json")
                .setBody(responseBody);
    }

    // 处理获取商品列表请求（带查询参数示例）
    private static MockResponse handleGetStatic1(RecordedRequest request) {
        // 可以解析请求中的查询参数，实现更动态的响应
        // 例如：/api/products?category=electronics&page=1
        Panel panel1 = new Panel("总支付订单","", "支付订单", "年", "success");
        Panel panel2 = new Panel("转化率","", "订单量", "周", "info");
        Panel panel3 = new Panel("总销售额","", "销售额", "年", "primary");
        Panel panel4 = new Panel("总用户","", "新增用户", "年", "warning");
        List<Panel> panelList = new ArrayList<>();
        panelList.add(panel1);
        panelList.add(panel2);
        panelList.add(panel3);
        panelList.add(panel4);
        System.out.println(JSON.toJSONString(panelList));
        String responseBody = "{\"code\": 200, \"message\": \"骨架屏\", \"data\": { \"panels\": "+ JSON.toJSONString(panelList)+"}}";
        return new MockResponse()
                .setResponseCode(200)
                .setHeader("Content-Type", "application/json")
                .setBody(responseBody);
    }


    static  String menuList = "[\n" + "  {\n" + "    \"id\": \"69401427fb8a2cb221b40071\",\n" + "    \"name\": \"后台主页\",\n" + "    \"menucode\": \"4743fd94-8457-452c-876d-63d4a0054401\",\n" + "    \"islevel\": 0,\n" + "    \"icon\": \"help\",\n" + "    \"frontpath\": \"/categroy/list\",\n" + "    \"child\": [\n" + "{\n" + "  \"id\": \"69401427d731c37e273a875b\",\n" + "  \"name\": \"主控制台\",\n" + "  \"menucode\": \"205a5e6b-cc7b-4411-a7ce-3caaccc75261\",\n" + "  \"islevel\": 0,\n" + "  \"icon\": \"fold\",\n" + "  \"frontpath\": \"/\"\n" + "},\n" + "{\n" + "  \"id\": \"6940142711c76d8d6a030249\",\n" + "  \"name\": \"系统管理\",\n" + "  \"menucode\": \"86f6ce02-5285-4a41-ad9a-b1b169c69c78\",\n" +  "  \"icon\": \"home-filled\",\n" + "  \"frontpath\": \"/sys/list\"\n" + "}\n" + "    ]\n" + "  },\n" + "  {\n" + "    \"id\": \"69401427459d13ebdfd21584\",\n" + "    \"name\": \"分类管理\",\n" + "    \"menucode\": \"8aa47c14-3965-47f1-9cd2-929c0ee9e259\",\n" + "    \"islevel\": 0,\n" + "    \"icon\": \"home-filled\",\n" + "    \"frontpath\": \"/categroy/list\",\n" + "    \"child\": [\n" + "{\n" + "  \"id\": \"6940142728ee78a688ae2d71\",\n" + "  \"name\": \"分类管理\",\n" + "  \"menucode\": \"47cafd30-4e98-4a31-99a8-df6544bc1510\",\n" + "  \"islevel\": 0,\n" + "  \"icon\": \"home-filled\",\n" + "  \"frontpath\": \"/categroy/list\"\n" + "},\n" + "{\n" + "  \"id\": \"69401427c2c41071c736ef53\",\n" + "  \"name\": \"商城管理\",\n" + "  \"menucode\": \"852330e3-79dd-46fb-9514-780dfd829a41\",\n" +  "  \"icon\": \"home-filled\",\n" + "  \"frontpath\": \"/goods/list\"\n" + "}\n" + "    ]\n" + "  },\n" + "  {\n" + "    \"id\": \"69401427baa7fb7ba89a00f9\",\n" + "    \"name\": \"商品管理\",\n" + "    \"menucode\": \"68bc062f-7312-4aea-8061-abed455297fb\",\n" + "    \"islevel\": 1,\n" + "    \"icon\": \"home-filled\",\n" + "    \"frontpath\": \"/goods/list\",\n" + "    \"child\": [\n" + "{\n" + "  \"id\": \"69401427519ba75075c436c3\",\n" + "  \"name\": \"主页管理\",\n" + "  \"menucode\": \"bf1a7ed3-aae8-4eac-86a9-d9cdf26196d8\",\n" + "  \"islevel\": 0,\n" + "  \"icon\": \"home-filled\",\n" + "  \"frontpath\": \"/sys/list\"\n" + "},\n" + "{\n" + "  \"id\": \"69401427d0aae14289a1ff63\",\n" + "  \"name\": \"标签管理\",\n" + "  \"menucode\": \"232557df-7c97-4bcc-852b-508c8fb1eb38\",\n" +  "  \"icon\": \"home-filled\",\n" + "  \"frontpath\": \"/sys/list\"\n" + "}\n" + "    ]\n" + "  }\n" + "]";
    static String role = "{\"id\":2, \"name\":\"超级管理员\"}";
    static String ruleNames = "[\"createRule,post\",\"updateRule,post\"]";



    // 处理获取商品列表请求（带查询参数示例）
    private static MockResponse handleGetStatic2(RecordedRequest request) {
        // 可以解析请求中的查询参数，实现更动态的响应
        // 例如：/api/products?category=electronics&page=1
        HttpUrl requestUrl = request.getRequestUrl();
        String type = requestUrl.queryParameter("type");
        String []  x = null ;
        int [] y = null ;
        switch(type){
            case "hours":
                x = new String[]{ "0","2","4","6","8","12","14","16","18","20","22","24"};
                y = new int[]{ 12, 2, 0, 0, 7, 30, 100, 150, 130, 200, 322, 9};
                break;
            case "week":
                x = new String[]{ "2025-12-15","2025-12-16","2025-12-17","2025-12-18","2025-12-19","2025-12-20"};
                y = new int[]{ 100, 99, 121, 24, 77, 30};
                break;
            case "month":
                x = new String[]{ "1","2","3","4","5","6","7","8","9","10","11","12"};
                y = new int[]{ 111, 211, 131, 41, 511, 51, 370, 180, 110, 220, 321, 911};
                break;
        }
        String responseBody = "{\"code\": 200, \"message\": \"图表统计\", \"data\": { \"x\": "+ JSON.toJSONString(x)+",\"y\":" +JSON.toJSONString(y)+"}}";
        return new MockResponse()
                .setResponseCode(200)
                .setHeader("Content-Type", "application/json")
                .setBody(responseBody);
    }


    // 处理获取商品列表请求（带查询参数示例）
    private static MockResponse handleGetStatic3(RecordedRequest request) {
        // 可以解析请求中的查询参数，实现更动态的响应
        // 例如：/api/products?category=electronics&page=1
        String [] gLable = new String[]{"审核中","销售中","已下架","库存预警"};
        String [] oLable = new String[]{"待付款","待发货","已发货","退款中"};
        List<Card> goods = new ArrayList<>();
        List<Card> orders = new ArrayList<>();
        for(int i=0 ; i<4; i++){
            Card g = new Card(gLable[i], (int) (Math.random()*10));
            goods.add(g);
            Card o = new Card(oLable[i], (int) (Math.random()*10));
            orders.add(o);
        }

        System.out.println(JSON.toJSONString(goods));
        String responseBody = "{\"code\": 200, \"message\": \"static3\", \"data\": { \"goods\": "+ JSON.toJSONString(goods)+",\"orders\": "+ JSON.toJSONString(goods)+"}}";
        return new MockResponse()
                .setResponseCode(200)
                .setHeader("Content-Type", "application/json")
                .setBody(responseBody);
    }
}

@Data
class Menu{
    private String id ;
    private String name ;
    private String frontpath ;
    private String icon ;
    @Setter
    private List<Menu> child ;

    public Menu(String id, String name, String frontpath, String icon){
        this.id = id;
        this.name = name;
        this.frontpath = frontpath;
        this.icon = icon;
    }
}
@Data
class Panel{

    private String subtitle ;
    private String subUnit ;
    private int subValue  ;
    private String title ;
    private String unit ;
    private String unitColor ;
    private int value ;

    public Panel(String subtitle, String subUnit, String title, String unit, String unitColor){
        this.subtitle = subtitle;
        this.subUnit = subUnit;
        this.subValue = (int) (100 *Math.random());
        this.title = title;
        this.unit = unit;
        this.unitColor = unitColor;
        this.value = (int) (100 *Math.random());
    }
}


@Data
class Card{
    private String label ;
    private int value ;

    public Card(String label, int value){
        this.label = label;
        this.value = value;
    }
}
```

测试类启动服务

```java
package com.small.rose.demo.mockserver;

import com.small.rose.demo.mock.MockWebServerDemo;
import org.junit.jupiter.api.Test;

import java.io.IOException;

public class MockServerTest {



    @Test
    public void test() throws IOException{

        MockWebServerDemo serverDemo = new MockWebServerDemo();
        serverDemo.start();

    }

}
```