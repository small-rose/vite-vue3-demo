<template>
    <div v-for="i in 20" :key="i" class="image-aside-list" :class="{ 'active': active}">
        <span class="truncate"><slot/></span>
        <el-button  class="ml-auto px-1" text type="primary" 
            @click="$emit('edit')">
            <el-icon><Edit/></el-icon>
        </el-button>
        <el-button class=" px-1" text type="primary"
            @click="$emit('delete')">
            <el-icon><Close/></el-icon>
        </el-button>
    </div>
</template>
<script setup> 
// 暴露激活状态
defineProps({
    active: {
        type: Boolean,
        default: false
    }
});

// 暴露按钮事件
defineEmits(["edit","delete"]);


</script>
<style scoped>
.image-aside-list{
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center p-3 text-sm text-gray-600 ;
}
.image-aside-list:hover, .active{
    @apply bg-blue-100 ;
}
</style>