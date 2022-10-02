import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'home',
    component:Home
  },
  {
    path:'/allproduct',
    name:'allproduct',
    component:()=>import('@/views/AllProduct.vue')
  },
  {
    path:'/person',
    name:'person',
    component:()=>import('@/views/Person.vue')
  },
  {
    path:'/myorder',
    name:'myorder',
    component:()=>import('@/views/MyOrder.vue')
  },
  {
    path:'/mywelfare',
    name:'mywelfare',
    component:()=>import('@/views/MyWelfare.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
