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
        <el-main   >
            <s-tag-list></s-tag-list>
            <router-view v-slot="{ Component}">
                <Transition  name="fade">
                <keep-alive :max="10">
                    <component :is="Component"></component>
                </keep-alive>
                </Transition>
            </router-view>
        </el-main>
    </el-container>
</el-container>
</template>
<style scoped>
.el-aside{
    transition: all 0.2s;
}  

.fade-enter-from{
    opacity: 0;
}
.fade-enter-to{
    opacity: 1;
}
.fade-leave-form{
    opacity: 1;
}
.fade-leave-to{
    opacity: 0;
}
.fade-enter-active, .fade-leave-active{
    transition:  all 0.3s;
}
.fade-enter-active{
    transition-delay: 0.3s;
}
</style>