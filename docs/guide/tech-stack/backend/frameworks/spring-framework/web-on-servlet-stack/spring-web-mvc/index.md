# Spring Web MVC

Spring Web MVC是Spring Framework的Web模块，提供了基于模型-视图-控制器(MVC)架构的强大Web框架。它构建在Servlet API之上，使用了前端控制器模式来实现请求的分发和处理。

## 核心组件

### DispatcherServlet

DispatcherServlet是Spring MVC的核心组件，充当前端控制器的角色。它负责接收所有的HTTP请求，并将它们路由到适当的处理程序：

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

### Controller

Controller是处理用户请求的组件，通常使用@Controller注解标记：

```java
@Controller
@RequestMapping("/users")
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping
    public String listUsers(Model model) {
        model.addAttribute("users", userService.findAll());
        return "users/list";
    }
    
    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        model.addAttribute("user", userService.findById(id));
        return "users/detail";
    }
    
    @PostMapping
    public String createUser(@Valid @ModelAttribute("user") UserForm userForm,
                             BindingResult result) {
        if (result.hasErrors()) {
            return "users/form";
        }
        userService.save(userForm);
        return "redirect:/users";
    }
}
```

### 请求映射

Spring MVC使用@RequestMapping及其变体(@GetMapping, @PostMapping等)来将请求映射到控制器方法：

```java
@RequestMapping(value = "/hello", method = RequestMethod.GET)  // 传统方式
@GetMapping("/hello")  // 简化方式（Spring 4.3+）
```

### 模型(Model)

Model是一个接口，用于在控制器和视图之间传递数据：

```java
@GetMapping("/profile")
public String showProfile(Model model) {
    model.addAttribute("user", getCurrentUser());
    model.addAttribute("activities", activityService.getRecentActivities());
    return "profile";
}
```

### 视图解析(ViewResolver)

ViewResolver负责将逻辑视图名解析为具体的视图对象：

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Bean
    public ViewResolver viewResolver() {
        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
        resolver.setTemplateEngine(templateEngine());
        resolver.setCharacterEncoding("UTF-8");
        return resolver;
    }
    
    @Bean
    public SpringTemplateEngine templateEngine() {
        SpringTemplateEngine engine = new SpringTemplateEngine();
        engine.setTemplateResolver(templateResolver());
        return engine;
    }
    
    @Bean
    public ITemplateResolver templateResolver() {
        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
        resolver.setPrefix("/WEB-INF/templates/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode(TemplateMode.HTML);
        resolver.setCharacterEncoding("UTF-8");
        return resolver;
    }
}
```

## 数据绑定和验证

### 数据绑定

Spring MVC可以自动将请求参数绑定到Java对象：

```java
@GetMapping("/search")
public String search(@RequestParam String keyword, @RequestParam(defaultValue = "1") int page) {
    // 使用参数
}

@PostMapping("/register")
public String register(@ModelAttribute("userForm") UserForm userForm) {
    // 使用表单对象
}

@GetMapping("/api/users/{id}")
public User getUser(@PathVariable Long id) {
    // 使用路径变量
}
```

### 表单处理

Spring MVC简化了表单处理：

```java
// 展示表单
@GetMapping("/register")
public String showRegistrationForm(Model model) {
    model.addAttribute("userForm", new UserForm());
    return "register";
}

// 处理表单提交
@PostMapping("/register")
public String processRegistration(@Valid @ModelAttribute("userForm") UserForm userForm,
                                  BindingResult result) {
    if (result.hasErrors()) {
        return "register";  // 返回表单页面，显示错误
    }
    
    userService.register(userForm);
    return "redirect:/login";  // 重定向到登录页面
}
```

### 数据验证

Spring MVC集成了Bean Validation API，支持声明式验证：

```java
public class UserForm {
    
    @NotBlank(message = "用户名不能为空")
    @Size(min = 4, max = 50, message = "用户名长度必须在4-50之间")
    private String username;
    
    @NotBlank(message = "密码不能为空")
    @Size(min = 8, message = "密码长度不能少于8个字符")
    private String password;
    
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;
    
    // getters and setters
}
```

## REST支持

Spring MVC提供了出色的REST支持：

```java
@RestController
@RequestMapping("/api/users")
public class UserRestController {
    
    private final UserService userService;
    
    public UserRestController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {
        User savedUser = userService.save(userDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedUser);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, 
                                         @Valid @RequestBody UserDTO userDTO) {
        return userService.update(id, userDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        return userService.delete(id) 
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
```

## 文件上传

Spring MVC简化了文件上传处理：

```java
@PostMapping("/upload")
public String handleFileUpload(@RequestParam("file") MultipartFile file,
                              RedirectAttributes redirectAttributes) {
    if (file.isEmpty()) {
        redirectAttributes.addFlashAttribute("message", "请选择要上传的文件");
        return "redirect:/upload";
    }
    
    try {
        String filename = storageService.store(file);
        redirectAttributes.addFlashAttribute("message", 
            "成功上传文件 " + filename);
    } catch (Exception e) {
        redirectAttributes.addFlashAttribute("message", 
            "上传失败: " + e.getMessage());
    }
    
    return "redirect:/upload";
}
```

## 异常处理

Spring MVC提供了多种异常处理机制：

```java
// 控制器级别的异常处理
@ExceptionHandler(UserNotFoundException.class)
public ModelAndView handleUserNotFoundException(UserNotFoundException ex) {
    ModelAndView mav = new ModelAndView("error/not-found");
    mav.addObject("message", ex.getMessage());
    return mav;
}

// 全局异常处理
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(Exception.class)
    public ModelAndView handleException(Exception ex) {
        ModelAndView mav = new ModelAndView("error/general");
        mav.addObject("message", "发生错误: " + ex.getMessage());
        return mav;
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
            ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse("资源不存在", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
```

## 拦截器(Interceptor)

拦截器可以在请求处理的不同阶段进行干预：

```java
public class LoggingInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, 
                            Object handler) throws Exception {
        // 在控制器方法执行前调用
        log.info("处理请求: {}", request.getRequestURI());
        return true;  // 返回true继续处理请求，返回false中断请求处理
    }
    
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, 
                          Object handler, ModelAndView modelAndView) throws Exception {
        // 在控制器方法执行后、视图渲染前调用
        if (modelAndView != null) {
            log.info("视图名: {}", modelAndView.getViewName());
        }
    }
    
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, 
                               Object handler, Exception ex) throws Exception {
        // 在请求完成后调用（视图渲染后）
        if (ex != null) {
            log.error("请求处理异常", ex);
        }
        log.info("请求完成");
    }
}

// 注册拦截器
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoggingInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/static/**");
    }
}
```

## 核心组件

- [DispatcherServlet](/guide/backend/frameworks/spring-framework/web-on-servlet-stack/spring-web-mvc/DispatcherServlet)

Spring Web MVC是构建Web应用的强大工具，对于ikun后端开发者来说，掌握它是构建企业级Web应用的必备技能。
