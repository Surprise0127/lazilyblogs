# Servlet

Servlet是Java Web开发的基础，是运行在Web服务器上的Java程序，用于处理客户端的请求并生成响应。它是Java EE规范的核心组件之一，也是Spring MVC等Web框架的基础。

## Servlet生命周期

Servlet的生命周期由Servlet容器（如Tomcat、Jetty）管理，包含以下阶段：

1. **加载和实例化**：Servlet容器加载Servlet类并创建实例
2. **初始化**：调用`init()`方法进行初始化
3. **服务**：调用`service()`方法处理客户端请求
4. **销毁**：调用`destroy()`方法释放资源

```java
public class HelloServlet extends HttpServlet {
    
    @Override
    public void init() throws ServletException {
        // 初始化操作，只执行一次
        System.out.println("Servlet初始化");
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        // 处理GET请求
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<html><body>");
        out.println("<h1>Hello, ikun!</h1>");
        out.println("</body></html>");
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        // 处理POST请求
    }
    
    @Override
    public void destroy() {
        // 清理操作，只执行一次
        System.out.println("Servlet销毁");
    }
}
```

## Servlet配置

Servlet可以通过web.xml或注解进行配置：

### 使用web.xml配置

```xml
<web-app>
    <servlet>
        <servlet-name>helloServlet</servlet-name>
        <servlet-class>com.ikun.web.HelloServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>helloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>
```

### 使用注解配置（Servlet 3.0+）

```java
@WebServlet(name = "helloServlet", urlPatterns = {"/hello"}, loadOnStartup = 1)
public class HelloServlet extends HttpServlet {
    // Servlet实现
}
```

## ServletContext

ServletContext代表整个Web应用程序，提供了与Servlet容器通信的接口。它是在Web应用程序启动时创建，在Web应用程序关闭时销毁。

```java
// 获取ServletContext
ServletContext context = getServletContext();

// 获取初始化参数
String paramValue = context.getInitParameter("paramName");

// 获取资源
InputStream is = context.getResourceAsStream("/WEB-INF/config.properties");

// 设置属性
context.setAttribute("attributeName", attributeValue);

// 获取属性
Object attributeValue = context.getAttribute("attributeName");
```

## HttpServletRequest

HttpServletRequest表示客户端的HTTP请求，提供了访问请求参数、头信息、cookies等的方法。

```java
// 获取请求参数
String username = request.getParameter("username");

// 获取所有参数名
Enumeration<String> paramNames = request.getParameterNames();

// 获取请求头
String userAgent = request.getHeader("User-Agent");

// 获取所有头名称
Enumeration<String> headerNames = request.getHeaderNames();

// 获取Cookie
Cookie[] cookies = request.getCookies();

// 获取会话
HttpSession session = request.getSession();

// 获取请求方法
String method = request.getMethod();

// 获取请求URI
String uri = request.getRequestURI();
```

## HttpServletResponse

HttpServletResponse表示服务器对客户端的HTTP响应，提供了设置响应内容、状态码、头信息等的方法。

```java
// 设置内容类型
response.setContentType("text/html;charset=UTF-8");

// 设置状态码
response.setStatus(HttpServletResponse.SC_OK);

// 设置响应头
response.setHeader("Cache-Control", "no-cache");

// 设置Cookie
Cookie cookie = new Cookie("username", "ikun");
cookie.setMaxAge(3600);  // 秒
response.addCookie(cookie);

// 获取输出流
PrintWriter out = response.getWriter();
out.println("<html><body>");
out.println("<h1>Hello, ikun!</h1>");
out.println("</body></html>");

// 重定向
response.sendRedirect("/anotherPage");
```

## 过滤器(Filter)

过滤器是可以对请求和响应进行预处理和后处理的组件，常用于认证、日志记录、数据转换等。

```java
@WebFilter(urlPatterns = "/*")
public class LoggingFilter implements Filter {
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 初始化
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                         FilterChain chain) throws IOException, ServletException {
        // 请求预处理
        System.out.println("Request received: " + 
                           ((HttpServletRequest)request).getRequestURI());
        
        // 传递给下一个过滤器或Servlet
        chain.doFilter(request, response);
        
        // 响应后处理
        System.out.println("Response sent");
    }
    
    @Override
    public void destroy() {
        // 清理
    }
}
```

## 监听器(Listener)

监听器用于监听Web应用程序中的各种事件，如应用程序启动/关闭、会话创建/销毁、属性变更等。

```java
@WebListener
public class AppListener implements ServletContextListener {
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // Web应用程序启动时执行
        System.out.println("Web应用程序启动");
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // Web应用程序关闭时执行
        System.out.println("Web应用程序关闭");
    }
}
```

## Servlet与Spring MVC

Spring MVC是建立在Servlet基础上的框架，它使用DispatcherServlet作为前端控制器，处理所有的请求并将它们分发给适当的处理器。理解Servlet对于深入学习Spring MVC至关重要。

在Spring MVC应用中，通常只需要配置一个DispatcherServlet，它会处理所有的请求并委托给适当的Controller：

```java
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[] { RootConfig.class };
    }
    
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { WebConfig.class };
    }
    
    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }
}
```

作为ikun后端开发者，掌握Servlet知识对于理解Web应用工作原理和使用高级Web框架都是至关重要的。
