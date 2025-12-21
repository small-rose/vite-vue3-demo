<template>
    {{ d.num.toFixed(2) }}
</template>

<script setup>
import { reactive, watch } from 'vue';    
import gsap from "gsap" 

// 暴露属性
const props = defineProps({
    value: {
        type: Number,
        default: 0
    }
})

const d = reactive({
    num:0
});

function AnimateToValue(){
    gsap.to(d, {
        duration: 0.5,
        num: props.value,
    });
}

AnimateToValue();

//监听 props.value 传入组件的值是否发生变化
watch(()=>props.value, ()=>AnimateToValue());

</script>