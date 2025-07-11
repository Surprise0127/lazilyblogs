// 社交链接配置
export const socialLinks = [
  { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
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
