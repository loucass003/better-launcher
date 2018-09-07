import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store';

Vue.use(Router)

export const routes = [
  {
    icon: 'home',
    path: '/',
    name: 'home',
    displayname: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/auth/SignUp',
    name: 'SignUp',
    hide: true,
    component: () => import('@/views/auth/SignUp')
  },
  {
    hide: true,
    path: '*',
    redirect: '/'
  }
];

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  const needAuth = !to.path.startsWith('/auth/');
  console.log("router selected", !!store.getters['session/selected'])
  if (needAuth && store.getters['session/selected'] == null) {
    next({ name: 'SignUp' })
  } else next()
});

export default router;