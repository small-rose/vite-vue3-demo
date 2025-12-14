<template>
<el-drawer v-model="showDrawer"  :title="title" :size="size" :close-on-click-modal="destroyOnClose">
    <div class="formDrawer">
        <div class="body">
            <slot></slot>
        </div>
        <div class="actions">
            <el-button  color="#626aef" class="w-[50px]" type="primary"
                @click="doSubmit" :loading="loading">{{ confirmText }}</el-button>
            <el-button class="w-[50px]" type="info"
                @click="close" >取消</el-button>
        </div>
    </div>
     
</el-drawer>
</template>  
<script setup>
    import {ref} from 'vue';
    
    // 定义抽屉的打开 关闭
    const showDrawer = ref(false);

    // 对外暴露属性
    const props = defineProps({
        title: String,
        size: {
            type:String,
            default:"40%"
        },
        destroyOnClose:{
            type: Boolean,
            default: false,
        },
        confirmText:{
            type:String,
            default:'确认'
        }
    });

    // open  打开抽屉
    const open = () => showDrawer.value = true ;
    // close 关闭抽屉
    const close = ()=> showDrawer.value = false ;

    // 按钮点击后的loading状态
    const loading = ref(false);
    const loadingShow = ()=> loading.value = true ;
    const loadingHide = ()=> loading.value = false ;

    // 使用编译器宏，暴露自己的属性给父级组件
    defineExpose({
        open,
        close,
        loadingShow,
        loadingHide
    });

    
    // 使用编译器宏, 传递按钮事件
    const emit = defineEmits(["submit"]);
    const doSubmit = ()=> emit("submit");

</script> 
<style>
    .formDrawer{
        height: 100%;
        width: 100%;
        position: relative;
        @apply flex flex-col;
    } 
    .formDrawer .body{
        flex: 1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow-y: auto;
    }
    .formDrawer .actions{
        height: 50px;
        @apply mt-auto flex ;
    }
</style>