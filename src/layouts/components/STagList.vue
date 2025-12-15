<template>
<div class="s-tag-list" :style="{left: $store.state.asideWidth}">
    <el-tabs v-model="activeTab" type="card" class="flex-1" style="min-width: 100px;"
    closable
    @tab-remove="removeTab"
  >
    <el-tab-pane :closable="item.path!='/'" v-for="item in tabList"
      :key="item.name" :label="item.title" :name="item.name" > 
    </el-tab-pane>
  </el-tabs>
  <span class="s-tag-btn">
    <el-dropdown>
    <span class="el-dropdown-link">
      <el-icon >
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </span>
</div>
</template>
<script setup>
import { useRoute } from 'vue-router'    
import { ref } from 'vue'

const route = useRoute();
const activeTab = ref(route.path);
const tabList = ref([
  {
    title: '后台首页',
    path: "/",
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: '商城管理',
    path: "/good/list",
    name: '2',
    content: 'Tab 2 content',
  }
])

const addTab = (targetName) => {
   
}
const removeTab = (targetName) => {
   
}
</script>
<style scoped>
    .s-tag-list{
        @apply fixed bg-gray-50 flex items-center px-2;
        top: 64px;
        right: 0;
    
    }
    .s-tag-btn{
        @apply bg-white rounded ml-auto flex items-center justify-center px-2; 
        height: 32px;
        /*width: 32px;*/
    }
    :deep(.el-tabs__header){
        @apply mb-0 ;
    }
    :deep(.el-tabs__nav){
        border: 0 !important;
    }
    :deep(.el-tabs__item){
        border: 0 !important;
        height: 32px;
        line-height: 32px;
        @apply bg-white mx-1 rounded
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