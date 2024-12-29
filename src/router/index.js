import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RemitenteView from '../views/remitente/RemitenteView'
import HojaRutaView from '../views/hojaruta/HojaRutaView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/remitente',
    name: 'remitente',
    component: RemitenteView
  },
  {
    path: '/hojaruta',
    name: 'hojaruta',
    component: HojaRutaView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
