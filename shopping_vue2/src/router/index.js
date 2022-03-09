import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', // history hash
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: 'Home',
    },
    {
      path: '/',
      redirect: 'Home',
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('@/views/Home/index.vue'),
    },
    {
      path: '/ProductList',
      name: 'ProductList',
      component: () => import('@/views/ProductList/index.vue'),
    },
    {
      path: '/ShoppingCart',
      name: 'ShoppingCart',
      component: () => import('@/views/ShoppingCart/index.vue'),
    },
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: () => import('@/views/PersonalCenter/index.vue'),
    },
  ],
});

export default router;
