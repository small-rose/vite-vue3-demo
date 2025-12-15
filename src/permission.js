import { router, addRoutes } from "./router"; 
import { getToken } from "~/utils/auth";
import { notice, showLoading, hideLoading } from '~/utils/notice';
import store from "./store";

// 全局路由守卫
router.beforeEach(async (to, from, next)=>{
    //显示进度条
    showLoading();

    const token = getToken();
    // 找不到 token 且不是去登录
    if(!token && to.path !='/login'){
        notice("请先登录", "error");
        // 没有登录强制回到登录页面
        return next({ path: "/login"});
    }

    if(token && to.path == "/login"){
        notice("请勿重复登录", "error");
        // 没有登录强制回到登录页面
        return next({ path: "/"});
    }

    let hasNewRouter = false ;
    // 如果用户登录了，自动获取用户信息，存储到 vuex 中
    if(token){
        let { menus } = await store.dispatch("getinfo");
        console.log(menus)
        // 添加动态路由
        hasNewRouter = addRoutes(menus);
    }

    // 设置页面title
    let title = (to.meta.title ? to.meta.title :"small-rose") +"-个人学习系统";
    document.title = title ;

    // 有新路由走新的路由，解决刷新问题
    //hasNewRouter ?  next(to.fullPath) : next();
    next();
});

// 全局后置守卫
router.afterEach((to, from)=>{
    hideLoading();
});
