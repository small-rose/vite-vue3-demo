<script setup>
import { Fold } from '@element-plus/icons-vue';

const iconNavs = [
    { icon:"user", color: "text-light-blue-500", title:"用户", path:"/tag/list"},
    { icon:"shopping-cart", color: "text-violet-500", title:"商品", path:"/tag/list"},
    { icon:"tickets", color: "text-fuchsia-500", title:"订单", path:"/tag/list"},
    { icon:"chat-dot-square", color: "text-teal-500", title:"评价", path:"/tag/list"},
    { icon:"picture", color: "text-light-rose-500", title:"图库", path:"/tag/list"},
    { icon:"bell", color: "text-green-500", title:"广告", path:"/tag/list"},
    { icon:"set-up", color: "text-grey-500", title:"配置", path:"/tag/list"},
    { icon:"files", color: "text-yelllo-500", title:"优惠", path:"/tag/list"},
]
</script>

<template>
    <el-row :gutter="20"  class="mt-5">
        <el-col :span="3" :offset="0" v-for="(item, index) in iconNavs" :key="index">
            <el-card shadow="hover" @click="$router.push(item.path)">
                <div class="flex flex-col items-center justify-center cursor-pointer" >
                    <el-icon :size="25" :class="item.color"> 
                        <component :is="item.icon" />
                    </el-icon>
                    <span class="text-sm"> {{ item.title }}</span>
                </div>
            </el-card>
        </el-col>
        
    </el-row>
    
</template>