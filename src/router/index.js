import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [

  {
    path:"/login",
    component:()=>import("../views/login/index.vue")

  },
  {
    path:"/main",
    component:()=>import("../views/main/index.vue"),
       children:[
         {
        path:"category",
         component:()=>import("../views/category/index.vue")

       },
         {
           path:"good",
           component:()=>import("../views/good/index.vue")

         },
         {
           path:"supplier",
           component:()=>import("../views/supplier/index.vue")

         },
         {
           path:"unit",
           component:()=>import("../views/unit/index.vue")

         },
         {
           path:"customer",
           component:()=>import("../views/customer/index.vue")

         },
         {
           path:"user",
           component:()=>import("../views/user/index.vue")

         },
         {
           path:"role",
           component:()=>import("../views/role/index.vue")

         },
         {
           path:"menu",
           component:()=>import("../views/menu/index.vue")

         },



       ]
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
