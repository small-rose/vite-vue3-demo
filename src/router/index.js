// 动态路由配置类
import { createRouter, createWebHashHistory } from 'vue-router'

// 引入后台主页
import Index from "~/pages/index.vue"
import Login from "~/pages/login.vue"
import NotFound from "~/pages/404.vue"

import Admin from "~/layouts/admin.vue"
import GoodList from "~/pages/goods/list.vue"
import TagList from "~/pages/tag/list.vue"
import CategroyList from "~/pages/categroy/list.vue"
import ImageList from "~/pages/image/list.vue"

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
const routes = [
    { path: "/", name: "admin", component: Admin, meta: { title: "后台首页" }, children: [] },
    // 登录页面
    { path: "/login", name: "login", component: Login, meta: { title: "登录页面" } },
    // 404 页面
    //{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { title: "404页面" } }
];

// 动态路由，匹配菜单动态添加   从 4.0.0 版本开始，子路由必须使用相对路径

const asyncRoutes = [
    { path: "/", name: "index", component: Index, meta: { title: "后台首页" } },
    { path: "/goods/list", name: "goods", component: GoodList, meta: { title: "商品管理" } },
    { path: "/tag/list", name: "tags", component: TagList, meta: { title: "标签管理" } },
    { path: "/image/list", name: "image", component: ImageList, meta: { title: "图库管理" } },
    { path: "/categroy/list", name: "categroy", component: CategroyList, meta: { title: "分类管理" } }
];

// 命名导出
export const router = createRouter({
    history: createWebHashHistory(),
    routes
    //routes  // routers: routers 的缩写,新手这里要注意，这个key一定是 routes, 
});

//export default router
//动态添加路由的方法
export function  addRoutes(menus) {
    // 定义是否有新的路由
    let hasNewRouter = false;
    // 先清空现有子路由
    const routes = router.getRoutes();
    const adminRoute = routes.find(r => r.name === 'admin');
    console.log('adminRoute', adminRoute);
    const findAddRoutesForMenus = (arr) => {
        arr.forEach(element => {
            //element.frontpath  就是菜单地址
            let item = asyncRoutes.find(o => o.path == element.frontpath);
             
            if (item) {
                // 确保有 name
                if (!item.name) {
                    // 自动生成 name
                    item.name = element.frontpath.replace(/\//g, '-').replace(/^-/, '');
                }
                
                    
                // 如果admin没有这个菜单子路由，则并且没有注册过路由，可以添加路由
                if (!router.hasRoute(item.name)) {
                //if(!alreadyInChildren){
                   // 转换路径
                   // 检查是否已经存在于 children 中
                   const alreadyInChildren = adminRoute.children.some(child => child.name === item.name);
                    let childPath = item.path;
                    if (childPath === '/') {
                        childPath = '';  // 主路径转为空字符串
                    } else if (childPath.startsWith('/')) {
                        childPath = childPath.substring(1);  // 移除开头的 /
                    }
                    console.log('item', item);
                    console.log('childPath', childPath);
                    
                    const itemNew = {
                        path: childPath,
                        name: item.name,
                        component: item.component,
                        meta: item.meta
                    }
                    //
                    router.addRoute('admin', itemNew);
                    if(!alreadyInChildren){
                        adminRoute.children.push(itemNew);
                    }
                     // 立即验证
                    const added = router.hasRoute(item.name);
                    console.log(`验证路由是否存在: ${item.name} -> ${added}`);
                    hasNewRouter = true;
                }
            }


            // 检查是否有子菜单，添加子菜单路由
            if (element.child && element.child.length > 0) {
                findAddRoutesForMenus(element.child);
            }
        });
    }
    findAddRoutesForMenus(menus);
    console.log('routes', router.getRoutes())

    return hasNewRouter;
    
} 