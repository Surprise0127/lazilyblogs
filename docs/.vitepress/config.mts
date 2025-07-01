import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "surprise",
  description: "一个Java后端仔的学习笔记",
  head: [['link', { rel: 'icon', href: '/image/ikun-logo.png' }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/image/ikun-logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: 'ikun', link: '/guide/life/' },
      { text: '前端', link: '/guide/frontend/' },
      { text: '后端', link: '/guide/backend/' },
      { text: '408', link: '/guide/408/' },
      { text: '方法论', link: '/guide/methodology/' },
      { text: 'leetcode', link: '/guide/leetcode/' },
      { text: '关于', link: '/guide/about/' }
    ],

    // 侧边栏
    sidebar: {
      '/guide/life/': [
        {
          text: '坤之世界',
          link: '/guide/life/',
          collapsed: true,
          items: [
            { text: 'ikun世界', link: '/guide/life/' },
            { text: '坤之专属', link: '/guide/life/ikun/' },
          ]
        },
        {
          text: '坤之数学',
          link: '/guide/life/math/',
          collapsed: true,
          items: [
            { text: '坤之数学', link: '/guide/life/math/' },
            { text: '高等数学',
              collapsed: true,
              items: [
                { text: '极限', link: '/guide/life/math/advanced/limit' },
                { text: '导数', link: '/guide/life/math/advanced/derivative' },
                { text: '积分', link: '/guide/life/math/advanced/integral' },
                { text: '微分方程', link: '/guide/life/math/advanced/differential-equation' }
              ]
            },
            { text: '线性代数',
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
          link: '/guide/life/english/',
          collapsed: true,
          items: [
            { text: '坤之英语', link: '/guide/life/english/' },
            { text: '英语词汇表', link: '/guide/life/english/programming-vocabulary' },
            { text: '技术文档阅读实践', link: '/guide/life/english/technical-reading' }
          ]
        }
      ],
      '/guide/frontend/': [
        {
          text: 'ikun前端',
          link: '/guide/frontend/',
          collapsed: true,
          items: [
            { text: 'ikun前端', link: '/guide/frontend/' },
            { text: '前端技术栈', link: '/guide/frontend/tech-stack' }
          ]
        }
      ],
      '/guide/backend/': [
        {
          text: '后端',
          items: [
            { text: '后端概览', link: '/guide/backend/' }
          ]
        }
      ],
      '/guide/408/': [
        {
          text: '408',
          items: [
            { text: '408概览', link: '/guide/408/' }
          ]
        }
      ],
      '/guide/methodology/': [
        {
          text: '方法论',
          items: [
            { text: '方法论概览', link: '/guide/methodology/' }
          ]
        }
      ],
      '/guide/leetcode/': [
        {
          text: 'LeetCode',
          items: [
            { text: 'LeetCode概览', link: '/guide/leetcode/' }
          ]
        }
      ],
      '/guide/about/': [
        {
          text: '关于',
          items: [
            { text: 'surprise', link: '/guide/about/' },
            { text: '两年半练习生', link: '/guide/about/ikun' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 surprise'
    },

    // 搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '没有找到结果',
                resetButtonTitle: '重置查询',
                footer: {
                  selectText: '选择',
                  navigateText: '导航',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    }
  }
})
