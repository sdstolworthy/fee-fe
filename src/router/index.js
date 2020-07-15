import Vue from 'vue';
import VueRouter from 'vue-router';
import FEHome from '../views/FE-Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: FEHome,
  },
  {
    path: '/catalog',
    name: 'catalog',
    props: true,
    component: () => import(/* webpackChunkName: "catalog" */ '../views/FE-WorkshopCatalog.vue'),
  },
  {
    path: '/catalog/:slug',
    name: 'workshop',
    props: true,
    component: () => import(/* webpackChunkName: "post" */ '../views/FE-Post.vue'),
  },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
