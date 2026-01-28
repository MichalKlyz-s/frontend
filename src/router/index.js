import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Organs', icon: '/images/logo.png' },
  },
  {
    path: '/config',
    name: 'config',
    component: () => import('../components/configurator/configurator.vue'),
    meta: { title: 'Config', icon: '/images/logo.png' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Organs';
  if (to.meta.icon) {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = to.meta.icon;
    if (!link.parentNode) document.head.appendChild(link);
  }
  next();
});
export default router;
