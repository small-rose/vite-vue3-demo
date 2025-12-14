<!-- 响应式 ref  和  reactive -->
<template>
    <div>
        后台首页

        <el-button @click="handleLogout">退出登录</el-button>
    </div>
</template>    
<script setup>
import { logout } from '../api/manager';
import { notice, showConfirm} from '../utils/notice';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();
const handleLogout = ()=>{
    showConfirm("是否要退出登录？").then(res=>{
        //
        logout().finally(()=>{
            // 移除 cookie 里面的 token
            // 清除 vuex 用户状态
            store.dispatch("logout");
            // 提示登出成功
            notice("退出登录成功！");
            //跳转登录首页
            router.push("/login");    
            
        })
    });
}   
</script>