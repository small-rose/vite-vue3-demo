<!-- 响应式 ref  和  reactive -->
<template>
    <div>
            <el-button @click="addCount" >{{ count }}</el-button>
            <el-button @click="addCount2" >{{ count2 }}</el-button>
            <el-button @click="addCount3" type="primary">{{ form.count3 }}</el-button>
    </div>
</template>    
<script setup>
    import { ref, reactive } from  'vue'
    const count = 0 ;
    
    function addCount(){
        count++;
        console.log('count', count)
    }
    const count2 = ref(100);

    function addCount2(){
        count2.value ++ 
        console.log('count2', count2)
    }

    const form = reactive({
        count3: 300
    })

    function addCount3(){
        form.count3 ++ 
        console.log('form.count3', form.count3)
    }

</script>