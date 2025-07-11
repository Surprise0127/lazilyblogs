import { defineConfig } from 'vitepress'
import { nav } from './configs/nav'
import { sidebar } from './configs/sidebar'
import { socialLinks, footer, search } from './configs/theme'
import mathjax3 from 'markdown-it-mathjax3'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "surprise",
  description: "一个Java后端仔的学习笔记",
  head: [['link', { rel: 'icon', href: '/image/ikun-logo.png' }]],

  markdown: {
    config: (md) => {
      md.use(mathjax3)
    },
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/image/ikun-logo.png',
    nav,

    // 侧边栏
    sidebar,

    socialLinks,

    // 页脚
    footer,

    // 搜索
    search
  }
})
