// 社交链接配置
export const socialLinks = [
  { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
]

// 导航栏配置
export const nav = [
  { text: '首页', link: '/' },
  { text: 'ikun', link: '/guide/life/' },
  { text: '技术栈', link: '/guide/tech-stack/' },
  { text: '408', link: '/guide/408/' },
  { text: '方法论', link: '/guide/methodology/' },
  { text: 'leetcode', link: '/guide/leetcode/' },
  { text: '关于', link: '/guide/about/' }
]

// 页脚配置
export const footer = {
  message: 'Released under the MIT License.',
  copyright: 'Copyright © 2024 surprise'
}

// 搜索配置
export const search = {
  provider: 'local' as const,
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
