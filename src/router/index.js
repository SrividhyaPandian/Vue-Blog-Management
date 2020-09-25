import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/components/Blog'
import BlogList from '@/components/BlogList'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'blogList',
      component: BlogList
    },
    {
      path: '/Blog/:id',
      name: 'Blog',
      component: Blog
    }
  ]
})
