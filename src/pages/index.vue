<template>
    <div class="">
        <el-row :gutter="20">
            <template v-if="panels.length ==0">
            <el-col :span="6" :offset="0" v-for="i in 4" :key="i">
                <el-skeleton style="width: 100%;" animated loading>
                    <template #template>
                        <el-card shadow="hover" class="border-0">
                            <template #header>
                                <div class="flex justify-between" height="61px">
                                <el-skeleton-item variant="text" rows="1" style="width: 50%;"/>
                                <el-skeleton-item variant="text" rows="1" style="width: 20%;"/>
                                </div>
                            </template>
                            <el-skeleton-item variant="h3" style="width: 80%;"/>
                            <el-divider/>
                            <div class="flex justify-between text-sm text-gray-500">
                                <el-skeleton-item variant="text" style="width: 50%;"/>
                                <el-skeleton-item variant="text" style="width: 20%;"/>
                            </div>
                        </el-card>
                    </template>
                </el-skeleton>
            </el-col>
            </template>
            <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
                <el-card shadow="hover" class="border-0 bg-gray-100">
                    <template #header>
                        <div class="flex justify-between">
                        <span>{{ item.title }}</span>
                        <el-tag :type="item.unitColor" effect="plain">
                            {{ item.unit }}
                        </el-tag>
                        </div>
                    </template>
                    <span class="text-3xl font-bold text-gray-500">
                        <CountTo :value="item.value" />
                    </span>
                    <el-divider/>
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>{{ item.subtitle }}</span>
                        <span>{{ item.subValue}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <IndexNavs></IndexNavs>

        <el-row :gutter="20" class="flex justify-between mt-5">
            <el-col :span="12" :offset="0">
                <IndexChart title="订单统计"/>
            </el-col>
            <el-col :span="12" :offset="0">
                <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" class="mb-3"/>
                <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="orders"/>
            </el-col>
        </el-row>
        
    </div>
</template>    
<!-- 响应式 ref  和  reactive -->
<script setup>
import { getstatics1,getstatics3 } from '~/api/index';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import CountTo from '~/components/CountTo.vue';
import IndexNavs from '~/components/IndexNavs.vue';
import IndexChart from '~/components/IndexChart.vue';
import IndexCard from '../components/IndexCard.vue';

const panels = ref([]);

// 获取上方数据的函数
const fetchStatistics = async () => {
        const res = await getstatics1();
        console.log('API static1 response:', res);
        
        if (res && res.data && res.data.panels) {
            panels.value = res.data.panels;
            console.log('Panels data set:', panels.value);
        } else {
            console.warn('Response data structure is unexpected:', res);
        }
};


const goods = ref([]);
const orders = ref([]);
// 获取右侧卡片数据
const fetchCardStatistics = async () => {
        const res = await getstatics3();
        console.log('API static3 response:', res);
        
        if (res && res.data && res.data.goods) {
            goods.value = res.data.goods; 
            orders.value = res.data.orders; 
        } else {
            console.warn('Response data structure is unexpected:', res);
        }
};
// 在组件挂载时获取数据
onMounted(() => {
    console.log('Component mounted, calling fetchStatistics...');
    fetchStatistics();
    fetchCardStatistics();
});




</script>