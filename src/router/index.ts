import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import(/* webpackChunkName: "about" */ '../components/RegisterPage.vue')
  },
  {
    path: '/main-page',
    name: 'MainPage',
    component: () => import(/* webpackChunkName: "about" */ '../components/MainPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/login-page',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "about" */ '../components/LoginPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//route Guard

router.beforeEach((to, from, next)=>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if(requiresAuth && !isAuthenticated){
    next("/");
  }
  else{
    next();
  }
})

export default router
