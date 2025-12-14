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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import okhttp3.mockwebserver.RecordedRequest;
import okio.Buffer;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
说明： 基于 MockWebServer 的简单模拟后端服务 启动后会创建一个 HTTP 服务器，前端可以直接调用
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
                } else if (path.startsWith("/admin/products")) {
                    return handleGetProducts(request);
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
        String responseBody = "{\"code\": 200, \"data\": {\"userId\": 1, \"username\": \"Admin\", \"avatar\": \"https://cdn.jsdelivr.net/gh/small-rose/small-rose.github.io/favicon.ico\"}}";
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
    private static MockResponse handleGetProducts(RecordedRequest request) {
        // 可以解析请求中的查询参数，实现更动态的响应
        // 例如：/api/products?category=electronics&page=1
        String responseBody = "{\"code\": 200, \"data\": [{\"id\": 1, \"name\": \"商品A\"}, {\"id\": 2, \"name\": \"商品B\"}]}";
        return new MockResponse()
                .setResponseCode(200)
                .setHeader("Content-Type", "application/json")
                .setBody(responseBody);
    }
}
```

测试类启动服务

```
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