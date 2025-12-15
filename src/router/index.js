// 动态路由配置类
import { createRouter, createWebHashHistory } from 'vue-router'

// 引入后台主页
import Index from "~/pages/index.vue"
import Login from "~/pages/login.vue"
import About from "~/pages/about.vue"
import NotFound from "~/pages/404.vue"

import Admin from "~/layouts/admin.vue"
import GoodList from "~/pages/goods/list.vue"
import TagList from "~/pages/tag/list.vue"
import { fa } from 'element-plus/es/locale/index.mjs'

// 添加后台主页路由, 这个路由名字随意，但是下方写法就不一样
/* 
const  routers = [

    { path: "/", component: Admin, meta:{ title:"后台首页"}, children:[
        {path:"/", component: Index, meta:{ title:"后台首页"} },
        {path:"/goods/list", component: GoodList, meta:{ title:"商品管理"} },
        {path:"/tag/list", component: TagList, meta:{ title:"标签管理"} }
    ]},
    { path: "/login", component: Login, meta:{ title:"登录页面"}},
    { path: "/about", component: About, meta:{ title:"关于页面"}},
    // 404 页面
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta:{ title:"404页面"} }
]
*/

// 默认路由，所有用户共享
const  routes = [
    { path: "/", name:"admin", component: Admin, meta:{ title:"后台首页"}, children:[]},
    // 登录页面
    { path: "/login", component: Login, meta:{ title:"登录页面"}},
    // 404 页面
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta:{ title:"404页面"} }
];

// 动态路由，匹配菜单动态添加
const asyncRoutes = [
    {path:"/", name:"/", component: Index, meta:{ title:"后台首页"} },
    {path:"/goods/list",name:"/goods/list", component: GoodList, meta:{ title:"商品管理"} },
    {path:"/tag/list",name:"/tag/list", component: TagList, meta:{ title:"标签管理"} },
    {path:"/sys/list",name:"/tag/list", component: null, meta:{ title:"系统管理"} },
];

// 命名导出
export const router = createRouter({
    history: createWebHashHistory(),
    routes
    //routes  // routers: routers 的缩写,新手这里要注意，这个key一定是 routes, 
});

//export default router
//动态添加路由的方法
export function addRoutes(menus){
    // 定义是否有新的路由
    let hasNewRouter = false ;

    const findAddRoutesForMenus = (arr)=>{
        arr.forEach(element => {
            //element.frontpath  就是菜单地址
            let item =  asyncRoutes.find(o=> o.path == element.frontpath);

            // 如果匹配返回不为空，并且没有注册过路由
            if(item && !router.hasRoute(item.path)){
                router.addRoute("admin", item);
                hasNewRouter = true ;
            }
            // 检查是否有子菜单，添加子菜单路由
            if(element.child && element.child.length>0 ){
                findAddRoutesForMenus(element.child);
            }
        });
    }
    findAddRoutesForMenus(menus);
    console.log(router.getRoutes())

    return hasNewRouter ;
} 