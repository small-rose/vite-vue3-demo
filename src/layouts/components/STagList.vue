<template>
<div class="s-tag-list" :style="{left: $store.state.asideWidth}">
    <el-tabs v-model="activeTab" type="card" class="flex-1" style="min-width: 100px;"
    closable    @tab-remove="removeTab" @tab-change="changeTab">
    <el-tab-pane :closable="item.path!='/'" v-for="item in tabList"
      :key="item.path" :label="item.title" :name="item.path" > 
    </el-tab-pane>
  </el-tabs>
  <span class="s-tag-btn">
    <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <el-icon >
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="colseOthers">关闭其他</el-dropdown-item>
        <el-dropdown-item command="colseAll">关闭所有</el-dropdown-item> 
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </span>
</div>
<div style="height: 44px;"></div>
</template>
<script setup> 
import {useTagList } from '~/utils/useTagList';
const  {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleCommand
    } = useTagList();


</script>
<style scoped>
    .s-tag-list{
        @apply fixed bg-gray-50 flex items-center px-2;
        top: 64px;
        right: 0;
        z-index: 1000;
    }
    .s-tag-btn{
        @apply bg-white rounded ml-auto flex items-center justify-center px-2; 
        height: 32px;
        /*width: 32px;*/
    }
    :deep(.el-tabs__header){
        border: 0 !important;
        @apply mb-0 ;
    }
    :deep(.el-tabs__nav){
        border: 0 !important;
    }
    :deep(.el-tabs__item){
        border: 0 !important;
        height: 32px;
        line-height: 32px;
        @apply bg-white mx-1 rounded;
    }
    :deep(.el-tabs__nav-next),:deep(.el-tabs__nav-prev){
        height: 32px;
        width: 32px;
        line-height: 32px;
    }
    :deep(.is-disabled){
        cursor: not-allowed;
        @apply bg-gray-100 ;
    }
</style>