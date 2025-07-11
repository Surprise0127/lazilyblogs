// 侧边栏配置

// 生活/ikun侧边栏
const lifeSidebar = [
  {
    text: '坤之世界',
    collapsed: true,
    items: [
      { text: 'ikun世界', link: '/guide/life/' },
      { text: '坤之专属', link: '/guide/life/ikun/' },
    ]
  },
  {
    text: '坤之数学',
    collapsed: true,
    items: [
      { text: 'ikun数学', link: '/guide/life/math/' },
      {
        text: '高等数学',
        collapsed: true,
        items: [
          { text: '极限', link: '/guide/life/math/advanced/limit' },
          { text: '导数', link: '/guide/life/math/advanced/derivative' },
          { text: '积分', link: '/guide/life/math/advanced/integral' },
          { text: '微分方程', link: '/guide/life/math/advanced/differential-equation' }
        ]
      },
      {
        text: '线性代数',
        collapsed: true,
        items: [
          { text: '矩阵', link: '/guide/life/math/linear-algebra/matrix' },
          { text: '向量空间', link: '/guide/life/math/linear-algebra/vector-space' },
          { text: '特征值与特征向量', link: '/guide/life/math/linear-algebra/eigenvalues-and-eigenvectors' },
          { text: '线性变换', link: '/guide/life/math/linear-algebra/linear-transformation' }
        ]
      }
    ]
  },
  {
    text: '坤之英语',
    collapsed: true,
    items: [
      { text: 'ikun英语', link: '/guide/life/english/' },
      { text: '文档阅读', link: '/guide/life/english/documentation-reading' },
      { text: '听力提升', link: '/guide/life/english/listening-improvement' },
      { text: '写作技巧', link: '/guide/life/english/writing-skills' },
      { text: '口语练习', link: '/guide/life/english/speaking-practice' }
    ]
  },
  {
    text: '高架之路',
    collapsed: true,
    items: [
      { text: '高架之路', link: '/guide/life/architecture/' },
      { text: '系统工程与信息系统', link: '/guide/life/architecture/system-engineering' }
    ]
  }
];

// 技术栈侧边栏
const techStackSidebar = [
  {
    text: '技术栈',
    // collapsed: true,
    items: [
      {
        text: '前端',
        collapsed: true,
        items: [
          { text: '前端技术栈', link: '/guide/tech-stack/frontend/' },
          { text: '前端概览', link: '/guide/tech-stack/frontend/tech-stack' }
        ]
      },
      {
        text: '后端',
        collapsed: true,
        items: [
          {
            text: 'Java',
            collapsed: true,
            items: [
              { text: 'Java基础', link: '/guide/tech-stack/backend/java/Java基础' },
              { text: '面向对象', link: '/guide/tech-stack/backend/java/oop' }
            ]
          },
          {
            text: '数据库',
            collapsed: true,
            items: [
              { text: '数据库概览', link: '/guide/tech-stack/backend/databases/' },
              { text: 'MySQL', link: '/guide/tech-stack/backend/databases/mysql/' },
              { text: 'PostgreSQL', link: '/guide/tech-stack/backend/databases/postgresql/' },
              { text: 'MongoDB', link: '/guide/tech-stack/backend/databases/mongodb/' }
            ]
          },
          {
            text: '框架',
            collapsed: true,
            items: [
              { text: '框架概览', link: '/guide/tech-stack/backend/frameworks/' },
              {
                text: 'Spring Framework',
                link: '/guide/tech-stack/backend/frameworks/spring-framework/',
                collapsed: true,
                items: [
                  {
                    text: 'Core Technologies',
                    link: '/guide/tech-stack/backend/frameworks/spring-framework/core-technologies/',
                    collapsed: true,
                    items: [
                      { text: 'Spring IoC', link: '/guide/tech-stack/backend/frameworks/spring-framework/core-technologies/spring-ioc' },
                      { text: 'Spring AOP', link: '/guide/tech-stack/backend/frameworks/spring-framework/core-technologies/spring-aop' },
                      { text: 'Spring Bean', link: '/guide/tech-stack/backend/frameworks/spring-framework/core-technologies/spring-bean' }
                    ]
                  },
                  { text: 'Data Access', link: '/guide/tech-stack/backend/frameworks/spring-framework/data-access/' },
                  {
                    text: 'Web on Servlet Stack',
                    link: '/guide/tech-stack/backend/frameworks/spring-framework/web-on-servlet-stack/',
                    collapsed: true,
                    items: [
                      { text: 'Servlet', link: '/guide/tech-stack/backend/frameworks/spring-framework/web-on-servlet-stack/servlet/' },
                      {
                        text: 'Spring Web MVC',
                        link: '/guide/tech-stack/backend/frameworks/spring-framework/web-on-servlet-stack/spring-web-mvc/',
                        collapsed: true,
                        items: [
                          { text: 'DispatcherServlet', link: '/guide/tech-stack/backend/frameworks/spring-framework/web-on-servlet-stack/spring-web-mvc/DispatcherServlet' }
                        ]
                      }
                    ]
                  },
                  { text: 'Web on Reactive Stack', link: '/guide/tech-stack/backend/frameworks/spring-framework/web-on-reactive-stack/' }
                ]
              },
              { text: 'Spring Boot', link: '/guide/tech-stack/backend/frameworks/spring-boot/' }
            ]
          },
          {
            text: '中间件',
            collapsed: true,
            items: [
              { text: '中间件概览', link: '/guide/tech-stack/backend/middleware/' },
              { text: 'Netty', link: '/guide/tech-stack/backend/middleware/netty/' },
              { text: 'Redis', link: '/guide/tech-stack/backend/middleware/redis/' },
              { text: 'RabbitMQ', link: '/guide/tech-stack/backend/middleware/rabbitmq/' },
              { text: 'Kafka', link: '/guide/tech-stack/backend/middleware/kafka/' }
            ]
          },
        ]
      },{
        text: '云原生',
        collapsed: true,
        items: [
          { text: '云原生概览', link: '/guide/tech-stack/cloud-native/' },
          {
            text: '容器化',
            collapsed: true,
            items: [
              { text: 'Docker 基础', link: '/guide/tech-stack/cloud-native/docker/' },
              { text: 'Docker 镜像构建', link: '/guide/tech-stack/cloud-native/docker/image-building' },
              { text: 'Docker Compose', link: '/guide/tech-stack/cloud-native/docker/compose' },
              { text: '容器网络', link: '/guide/tech-stack/cloud-native/docker/networking' }
            ]
          },
          {
            text: 'Kubernetes',
            collapsed: true,
            items: [
              { text: 'K8s 基础概念', link: '/guide/tech-stack/cloud-native/kubernetes/' },
              { text: 'Pod 与工作负载', link: '/guide/tech-stack/cloud-native/kubernetes/workloads' },
              { text: '服务与网络', link: '/guide/tech-stack/cloud-native/kubernetes/services' },
              { text: '存储', link: '/guide/tech-stack/cloud-native/kubernetes/storage' },
              { text: '配置管理', link: '/guide/tech-stack/cloud-native/kubernetes/configuration' },
              { text: '安全', link: '/guide/tech-stack/cloud-native/kubernetes/security' },
              { text: '应用部署与管理', link: '/guide/tech-stack/cloud-native/kubernetes/deployment-management' },
              { text: '可观测性', link: '/guide/tech-stack/cloud-native/kubernetes/monitoring-logging' },
              { text: '高级主题', link: '/guide/tech-stack/cloud-native/kubernetes/ci-cd' },
            ]
          },
          {
            text: 'CI/CD',
            collapsed: true,
            items: [
              { text: 'CI/CD 概述', link: '/guide/tech-stack/cloud-native/kubernetes/ci-cd/overview' },
              { text: 'Jenkins', link: '/guide/tech-stack/cloud-native/kubernetes/ci-cd/jenkins' },
              { text: 'GitLab CI', link: '/guide/tech-stack/cloud-native/kubernetes/ci-cd/gitlab-ci' },
              { text: 'GitHub Actions', link: '/guide/tech-stack/cloud-native/kubernetes/ci-cd/github-actions' },
            ]
          }
        ]
      }
    ]
  }
];

// 408侧边栏
const eduSidebar = [
  {
    text: '408',
    collapsed: true,
    items: [
      { text: '408概览', link: '/guide/408/' }
    ]
  },
  {
    text: '计算机组成原理',
    collapsed: true,
    link: '/guide/408/computer-organization/',
    items: []
  },
  {
    text: '数据结构',
    collapsed: true,
    link: '/guide/408/data-structure/',
    items: []
  },
  {
    text: '操作系统',
    collapsed: true,
    link: '/guide/408/operating-system/',
    items: []
  },
  {
    text: '计算机网络',
    collapsed: true,
    link: '/guide/408/computer-network/',
    items: []
  }
];

// 方法论侧边栏
const methodologySidebar = [
  {
    text: '方法论',
    collapsed: true,
    items: [
      { text: '开发理论', link: '/guide/methodology/development-theory' }
    ]
  }
];

// LeetCode侧边栏
const leetcodeSidebar = [
  {
    text: 'LeetCode',
    items: [
      { text: 'LeetCode概览', link: '/guide/leetcode/' }
    ]
  }
];

// 关于侧边栏
const aboutSidebar = [
  {
    text: '关于',
    items: [
      { text: 'surprise', link: '/guide/about/' },
      { text: '两年半练习生', link: '/guide/about/ikun' }
    ]
  }
];

// 整合所有侧边栏配置
export const sidebar = {
  '/guide/life/': lifeSidebar,
  '/guide/tech-stack/': techStackSidebar,
  '/guide/408/': eduSidebar,
  '/guide/methodology/': methodologySidebar,
  '/guide/leetcode/': leetcodeSidebar,
  '/guide/about/': aboutSidebar
};
