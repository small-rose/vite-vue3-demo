  
<script setup>
import {ref, onMounted, onBeforeUnmount } from 'vue';
import { getstatics2 } from '~/api';
const current = ref("week");
const options = [
    {text: "近一个月", value:"month"},
    {text: "近一周", value:"week"},
    {text: "近24小时", value:"hours"},
]


defineProps({
    title: String
});

const handleChoose = (type)=>{
    current.value = type;
    getData();
}


import * as echarts from 'echarts'; 


var myChart = null;
// 渲染完成页面后执行
onMounted(()=>{
    var chartDom = document.getElementById('chart');
    myChart = echarts.init(chartDom);
    if( myChart) {
        getData();
    }
});

// 页面卸载时触发
onBeforeUnmount(()=>{
    if(myChart){
        // 销毁对象
        echarts.dispose();
    }
});

function getData(){
    var  option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
            }
        ],
        yAxis: [
            {
            type: 'value'
            }
        ],
        series: [
            {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
    //myChart.showLoading();
    getstatics2(current.value).then((res)=>{
        console.log("my", res);
        option.xAxis.data = res.data.x ;
        option.series[0].data = res.data.y ;
        myChart.setOption(option); 
    }).finally(()=>{
        //myChart.hideLoading();
    }); 
}

import { useResizeObserver } from '@vueuse/core';
const el = ref(null);
useResizeObserver(el,(entries)=>{
    myChart.resize();
});
</script>  
<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">{{ title }}</span>
                <div>
                    <el-check-tag v-for="(item, index) in options" :key="index"
                    :checked="current == item.value" style="margin-right: 8px;" @click="handleChoose(item.value)">
                        {{ item.text }}
                    </el-check-tag>
                </div>
            </div>
        </template>
        <div ref="el" id="chart" style="width: 100%; height: 300px;" ></div>
    </el-card>
</template>