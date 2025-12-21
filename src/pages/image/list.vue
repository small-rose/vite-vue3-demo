<template>
    <el-container class="bg-white rounded " :style="{height: (h +'px')}">
      <el-header class="image-header">Header</el-header>
      <el-container>
          <ImageAside /> 
          <ImageMain />
      </el-container>
    </el-container>
</template>
<script setup>
import ImageAside from '~/components/ImageAside.vue';
import ImageMain from '~/components/ImageMain.vue';

const  windowHeight = window.innerHeight || document.body.clientHeight ;
const h = windowHeight - 64 - 44 - 40;
</script>
<style>
.image-header{
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center ;
}   
.image-aside{
    border-right: 1px solid #eeeeee;
    position: relative;
}   
.image-main{
    position: relative;
}    

.image-aside .top, image-main .top{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}   

.image-aside .bottom, image-main .bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    @apply flex items-center justify-center ;
}   

</style>