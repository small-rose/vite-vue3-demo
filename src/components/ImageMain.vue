<template>
    <el-main class="image-main">
            <div class="top">
                <div v-for="i in 300" :key="i">{{ i }}</div>
            </div>
            <div class="bottom">
                分页区域
            </div>
    </el-main>
</template>
<script setup>

</script>

<style>
.image-header{
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center ;
} 
.image-main{
    position: relative;
}    

.image-main .top{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}   

.image-main .bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    @apply flex items-center justify-center ;
}   

</style>