import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import logo from '../assets/logo.png'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Organs', icon: logo }
  },
  {
    path: '/config',
    name: 'config',
    component: () => import(/* webpackChunkName: "about" */ '../components/configurator.vue'),
    meta: {title: 'Config', icon: logo}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Organs'
  const faviconPath = to.meta.icon
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'icon'
  link.href = faviconPath
  document.head.appendChild(link)
  next()
})
export default router
