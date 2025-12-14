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
        <el-aside>
            <s-menu></s-menu>
        </el-aside>
        <el-main>
            <s-tag-list></s-tag-list>
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>