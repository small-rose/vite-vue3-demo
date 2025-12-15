
<script setup>
import { useRouter } from 'vue-router'; 
import { computed, ref } from 'vue'; 
import { useStore } from 'vuex';
const router = useRouter();

const store = useStore();
// 计算是否折叠 250px 是展开
const isCollapse = computed(()=>!(store.state.asideWidth=='250px'));

const defaultActive = ref();

const asideMenus = computed(()=>store.state.menus);
/*
const asideMenus = [
    {"id":"1", "name":"后台面板","icon":"star","child":[
        {"id":"11", "name":"主面板","icon":"help","frontpath":"/"}
    ]},
    {"id":"2", "name":"标签管理","icon":"help","child":[
        {"id":"22", "name":"标签管理","icon":"home-filled","frontpath":"/tag/list"}
    ]},
    {"id":"3", "name":"商城管理","icon":"shopping-bag","child":[
        {"id":"33", "name":"商品管理","icon":"ShoppingCart","frontpath":"/goods/list"}
    ]}
];
*/
const handleSelect =(e) =>{
    // path路径
    console.log(e);
    router.push(e);
}
</script>
<template>
<div class="s-menu" :style="{ width : $store.state.asideWidth}">
    <el-menu :default-active="defaultActive" :collapse="isCollapse" default-active="2"  class="border-0" @select="handleSelect" 
    :collapse-transition="false"
    :unique-opened="true">
        <template v-for="(item, index) in asideMenus" :key="index">
            <el-sub-menu v-if="item.child && item.child.length >0" :index="item.name">
            <template #title>
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(item2, index2) in item.child" :key="index2"
            :index="item2.frontpath">
                <template #title>
                <el-icon>
                    <component :is="item2.icon"></component>
                </el-icon>
                <span>{{ item2.name }}</span>
            </template>
            </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="item.frontpath">
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
            </el-menu-item>
        </template>     
    </el-menu>
</div>
</template>
<style >
    .s-menu{
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* 更平滑的贝塞尔曲线 */
        /*width: 250px;*/
        top: 64px;
        left: 0;
        bottom: 0;
        overflow-y: auto;
        overflow-x: hidden;
        @apply shadow-md fixed bg-light-50; 
    }

  
.el-menu-item:hover,
.el-sub-menu__title:hover {
    background-color: rgba(64, 158, 255, 0.1);
}
/* 菜单项整体过渡 */
:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

/* 文字在折叠时逐渐消失 */
:deep(.el-menu--collapse) .el-menu-item span,
:deep(.el-menu--collapse) .el-sub-menu__title span {
    opacity: 0;
    max-width: 0;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
}

/* 文字在展开时逐渐显示 */
:deep(.el-menu:not(.el-menu--collapse)) .el-menu-item span,
:deep(.el-menu:not(.el-menu--collapse)) .el-sub-menu__title span {
    opacity: 1;
    max-width: 200px; /* 设置一个足够大的最大宽度 */
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
                max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}
</style>