<script setup lang="ts">
import { Aim, FullScreen, Unlock } from '@element-plus/icons-vue';
import {useFullscreen } from '@vueuse/core';
import FormDrawer from '~/components/FormDrawer.vue';
import { useRepassword, useLogout } from '~/utils/userManager';

const { 
        formDrawerRef,
        form, 
        formRef, 
        ruleFs,
        onSubmit,
        openRepassForm,
    } = useRepassword();

const { handleLogout } = useLogout();

const {isFullscreen, // 全屏状态
     toggle // 切换全屏
      } = useFullscreen();


const handleCommand = (c)=>{
    switch (c){
        case "logout":
            handleLogout();
            break;
        case "rePassword":
            // 调用 组件节点的 open方法
            openRepassForm();
            break;
        case "profile":
            console.log('查看信息');
            break;
    }
}

// 刷新
const handleRefresh = ()=> location.reload();
 
</script>

<template>
<div class="s-header">
    <span class="s-logo">
        <el-icon class="mf-1 mr-1"><eleme-filled/></el-icon>
        个人学习网站
    </span>
    <el-tooltip content="收起" effect="dark">
        <el-icon class="icon-btn"><fold/></el-icon>
    </el-tooltip>
    <el-tooltip content="刷新" placement="bottom" effect="dark">
        <el-icon class="icon-btn" @click="handleRefresh"><refresh/></el-icon>
    </el-tooltip>
    <div class="s-header-right">
        <el-tooltip content="全屏" placement="bottom" effect="dark">
            <el-icon class="icon-btn" @click="toggle">
                <FullScreen v-if="!isFullscreen"/><Aim v-else/>
            </el-icon>
        </el-tooltip>
        <el-dropdown @command="handleCommand">
            <span class="flex items-center text-light-50">
            <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar"></el-avatar>
            {{ $store.state.user.username }}
            <!-- <el-avatar :size="25" :src="$store.user.avatar"></el-avatar> -->
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="rePassword" >修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                <el-dropdown-item command="profile">个人信息</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</div>
<!--
<el-drawer v-model="showDrawer" header-class="#626aef" title="修改密码" size="35%" :close-on-click-modal="false">
    <el-form ref="formRef" :rules="ruleFs" :model="form"  class="w-[300px]" size="small">
            <el-form-item prop="oldpassword" label="当前密码">
                <el-input v-model="form.oldpassword" placeholder="请输入旧密码" show-password>
                     <template #prefix>
                        <el-icon><Unlock/></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="新的密码" >
                <el-input v-model="form.password" placeholder="请输入新密码" show-password>
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码" >
                <el-input v-model="form.repassword" placeholder="请再次输入新密码" show-password>
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button  color="#626aef" class="w-[50px]" type="primary"
                @click="obSubmit" :loading="loading">确认</el-button>

                 <el-button color="#626aef" class="w-[50px]" type="success"
                @click="obCancel" >取消</el-button>
            </el-form-item>
        </el-form>  
</el-drawer>
-->

<!-- 使用自定义组件 打开抽屉-->
<form-drawer ref="formDrawerRef" title="修改密码" @submit="onSubmit">
    <el-form ref="formRef" :rules="ruleFs" :model="form"  class="w-[300px]" style="height: 1000px;" size="small">
            <el-form-item prop="oldpassword" label="当前密码">
                <el-input v-model="form.oldpassword" placeholder="请输入旧密码" show-password>
                     <template #prefix>
                        <el-icon><Unlock/></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="新的密码" >
                <el-input v-model="form.password" placeholder="请输入新密码" show-password>
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码" >
                <el-input v-model="form.repassword" placeholder="请再次输入新密码" show-password>
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>  
</form-drawer>

</template>
<style scoped>
    .s-header{
        @apply flex items-center bg-indigo-500 text-light-100 fixed top-0 left-0 right-0;
        height: 64px;
    }
    .s-logo{
       width: 250px;   
       @apply flex justify-center items-center font-thin;  
    }
    .icon-btn{
        @apply flex justify-center items-center ;
        width: 42px;
        height: 42px;
        cursor: pointer;
    }
    .s-header .s-header-right{
       @apply ml-auto flex items-center ;
    }
    .s-header .dropdown{
        height: 42ox;
    }
</style>