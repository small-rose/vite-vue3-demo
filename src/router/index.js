import { createRouter, createWebHistory } from 'vue-router'

// 引入后台主页
import Index from "~/pages/index.vue"
import Login from "~/pages/login.vue"
import About from "~/pages/about.vue"
import NotFound from "~/pages/404.vue"

import Admin from "~/layouts/admin.vue"

// 添加后台主页路由, 这个路由名字随意，但是下方写法就不一样
const  routers = [

    { path: "/", component: Admin, meta:{ title:"后台首页"}, children:[
        {path:"/", component: Index, meta:{ title:"后台首页"} }
    ]},
    { path: "/login", component: Login, meta:{ title:"登录页面"}},
    { path: "/about", component: About, meta:{ title:"关于页面"}},
    // 404 页面
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta:{ title:"404页面"} }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routers
    //routes  // routers: routers 的缩写,新手这里要注意，这个key一定是 routes, 
});

export default router