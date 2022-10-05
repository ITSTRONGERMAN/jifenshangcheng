import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/allproduct",
    name: "allproduct",
    component: () => import("@/views/AllProduct.vue"),
  },
  {
    path: "/person",
    name: "person",
    redirect: "/person/cart",
    component: () => import("@/views/Person.vue"),
    children: [
      {
        path: "cart",
        component: () => import("@/components/Cart.vue"),
      },
    ],
  },
  {
    path: "/myorder",
    name: "myorder",
    component: () => import("@/views/MyOrder.vue"),
  },
  {
    path: "/mywelfare",
    name: "mywelfare",
    component: () => import("@/views/MyWelfare.vue"),
  },
  {
    path: "/productdetail",
    name: "productdetail",
    component: () => import("@/views/Details.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
// 导航守卫，每次跳转路由都会执行这个代码
// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem("x-auth-token");
//  if(to.path==='/person'){
//   if(!token){
//     store.dispatch('ShowTips/asyncchangeIsShowTips',{
//       isShow:true,
//       type:'warning',
//       msg:'检测到您未登录请先登录，请先登录'
//     })
//     return
//   }
//  }
//  next()
// });
export default router;
