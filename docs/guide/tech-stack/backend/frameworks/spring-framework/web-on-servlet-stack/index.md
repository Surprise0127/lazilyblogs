# Web on Servlet Stack

Spring Web MVC是基于Servlet API构建的原始Web框架，从一开始就被包含在Spring Framework中。正式名称"Spring Web MVC"来源于其源模块的名称（spring-webmvc），但更常被称为"Spring MVC"。

## 什么是Spring MVC？

Spring MVC是一个基于模型-视图-控制器(MVC)设计模式的Web框架。它可以帮助开发者创建松耦合的Web应用程序，其中模型(Model)、视图(View)和控制器(Controller)是分离的组件。

## Spring MVC的核心组件

### DispatcherServlet

DispatcherServlet是Spring MVC的核心，它负责接收HTTP请求并将其分发给相应的处理器。DispatcherServlet实现了前端控制器设计模式，处理请求的工作流程如下：

1. 接收HTTP请求
2. 将请求分发给合适的Controller
3. Controller处理业务逻辑并返回ModelAndView
4. 渲染视图并返回响应

### Controller

Controller负责处理用户请求并构建合适的模型，然后将模型传递给视图进行渲染。在Spring MVC中，控制器通常使用@Controller注解标记：

```java
@Controller
public class HelloController {

    @GetMapping("/hello")
    public String hello(Model model) {
        model.addAttribute("message", "Hello from Spring MVC!");
        return "hello";
    }
}
```

### Model

Model是一个接口，它用于将数据从Controller传递给视图模板。Model是一个Map，可以在其中存储键值对：

```java
model.addAttribute("username", "蔡徐坤");
model.addAttribute("skills", Arrays.asList("唱", "跳", "rap", "篮球"));
```

### ViewResolver

ViewResolver负责将逻辑视图名解析为实际的View对象。Spring MVC支持多种视图技术，如JSP、Thymeleaf、FreeMarker等。

```java
@Configuration
public class MvcConfig implements WebMvcConfigurer {
    
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        return resolver;
    }
}
```

## 请求处理流程

Spring MVC的请求处理流程如下：

1. 客户端发送请求到DispatcherServlet
2. DispatcherServlet查询HandlerMapping，确定调用哪个Controller
3. Controller执行业务逻辑，返回ModelAndView
4. DispatcherServlet将ModelAndView传递给ViewResolver
5. ViewResolver解析视图名称并返回View对象
6. View对象使用Model数据渲染视图
7. DispatcherServlet将渲染后的视图返回给客户端

## Spring MVC的优势

- **松耦合设计**：模型、视图和控制器的分离使代码更加模块化和可维护
- **灵活性**：支持多种视图技术和数据绑定方式
- **测试友好**：组件化设计使单元测试变得简单
- **与Spring生态集成**：无缝集成Spring的其他功能，如Spring Security、Spring Data等
- **注解驱动**：通过注解简化配置和开发

## Spring MVC与Spring Boot的关系

Spring Boot简化了Spring MVC的配置和使用，通过自动配置和约定优于配置的原则，减少了开发者的工作量。但要注意，Spring Boot不是Spring MVC的替代品，而是在Spring MVC之上提供了更高级别的抽象和便利性。

## 相关主题

- [Servlet](/guide/backend/frameworks/spring-framework/web-on-servlet-stack/servlet/)
- [Spring Web MVC](/guide/backend/frameworks/spring-framework/web-on-servlet-stack/spring-web-mvc/)

通过深入学习Spring MVC，ikun后端开发者可以掌握构建强大Web应用的核心技能。
