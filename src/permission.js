import { router, addRoutes } from "./router";
import { getToken } from "~/utils/auth";
import { notice, showLoading, hideLoading } from '~/utils/notice';
import store from "./store";
import { useCookies } from "@vueuse/integrations";

let hasGetInfo = false;
let current ;
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
    current = to ;
    console.log('进入全局前置路由守卫')
    //显示进度条
    showLoading();

    const token = getToken();
    // 找不到 token 且不是去登录
    if (!token && to.path != '/login') {
        notice("请先登录", "error");
        // 没有登录强制回到登录页面
        return next({ path: "/login" });
    }

    if (token && to.path == "/login") {
        notice("请勿重复登录", "error");
        // 没有登录强制回到登录页面
        return next({ path: "/" });
    }
    let hasNewRouter = false;
 
     // 如果用户登录了，自动获取用户信息，存储到 vuex 中
    if (token && !hasGetInfo) {
        console.log('进入 getinfo 调用')
        let { menus } = await store.dispatch("getinfo");
        hasGetInfo = true;
        // 添加动态路由
        hasNewRouter = addRoutes(menus);
        console.log('to', to);
    }
    console.log('hasNewRouter', hasNewRouter);
    console.log('before router.getRoutes()', router.getRoutes());   
       
    // 设置页面title
    let title = (to.meta.title ? to.meta.title : "small-rose") + "-个人学习系统";
    document.title = title;
    hasNewRouter ?  next({ ...to, replace: true }): next();
    //next();


});

// 全局后置守卫
router.afterEach((to, from) => {
    console.log('进入全局后置路由守卫')
    hideLoading();
});
