import Layout from './Layout.vue'
import './style.css'
// 如果需要全局注册 Life 组件，取消下面这行注释并创建对应的组件文件
// import Life from '../components/Life.vue'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    // app.component('Life', Life)
    
  }
}