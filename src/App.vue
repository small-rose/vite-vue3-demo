<script setup>


</script>

<template>
    <router-view></router-view>
</template>

<style scoped>
body{
    @apply bg-gray-100 ;
}    

/*进度条样式修改 */
#nprogrss .bar{
    background-color: cadetblue !important;
    height: 3px !important;
}

::-webkitt-scrollbar, ::-moz-scrollbar{
    width: 4px;
    height: 6px;
}
::-webkitt-scrollbar-corner, ::-moz-scrollbar-corner{
    display: block;
}
::-webkitt-scrollbar-thumb, ::-moz-scrollbar-thumb{
    border-radius: 8px;
    background-color: rgb(0, 0,0, 0.2);
}
::-webkitt-scrollbar-thumb, ::-webkit-scrollbar-track,
::-moz-scrollbar-thumb, ::-moz-scrollbar-track{
    border-right-color: transparent;
    border-left-color: transparent;
}
</style>
