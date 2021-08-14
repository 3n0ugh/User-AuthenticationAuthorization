import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/signup.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
