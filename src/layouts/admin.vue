<script setup>
    import SHeader from './components/SHeader.vue';
    import SMenu from './components/SMenu.vue';
    import STagList from './components/STagList.vue';
</script>
<template>
<el-container>
    <el-header>
        <s-header></s-header>
    </el-header>
    <el-container>
        <el-aside :width="$store.state.asideWidth" class="aside-placeholder">
            <s-menu></s-menu>
        </el-aside>
        <el-main  class="main-content" >
            <div class="tag-list">
                <s-tag-list></s-tag-list>
            </div>
            <div class="content-wrapper">
                <router-view></router-view>
            </div>
        </el-main>
    </el-container>
</el-container>
</template>
<style scoped>
.el-aside{
    transition: all 0.2s;
}
.main-content {
    margin-top: 60px;
    padding: 0;
    background-color: #f5f5f5;
    min-height: calc(100vh - 60px);
    /* 优化过渡效果 */
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tag-list, .content-wrapper {
    padding: 20px;
    background: white;
    border-radius: 8px;
    margin: 10px;
    min-height: calc(100vh - 120px);
    /* 添加内边距过渡 */
    transition: margin 0.3s ease, padding 0.3s ease;
}
</style>