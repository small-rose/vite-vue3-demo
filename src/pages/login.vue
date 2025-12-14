<script setup>
  // onMounted 页面渲染完成后的生命周期触发
  // onBeforeUnmount 页面卸载完成前的生命周期触发
  
    import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
    import { login } from '~/api/manager'
    import { notice} from '~/utils/notice';
    import { setToken } from  '~/utils/auth'
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { getinfo } from '../api/manager'; 
    
    const router = useRouter();
    const store = useStore();

    const form = reactive({
        username:"",
        password:""
    })

    const ruleFs = reactive({
        username: [
            {required: true, message:"用户名不能为空", trigger:'blur'},
            {min: 1, max: 10, message:"用户名长度1到10个字符", trigger:'blur'},
        ],
        password: [
            {required: true, message:"密码不能为空", trigger:'blur'},
            {min: 1, message:"密码不能少于6位", trigger:'blur'}
        ]
    });

    const formRef = ref(null);
    // loading 等待
    const loading = ref(false);
    const obSubmit = ()=>{

        formRef.value.validate(valid=>{

            if(!valid){
                console.log(' valied failed !')
            }
            loading.value = true ;
            console.log('login submit!');
            // dispath 触发 store 组件的 actions 
            store.dispatch("login", form).then(res=>{
                notice("登录成功");
                router.push("/");
            }).finally(()=>{
                loading.value = false ;
            });

            /*
            login(form.username, form.password)
            .then(res=>{
                console.log('res', res);
                // 提示成功
                notice("登录成功");
                // 存储用户信息
                setToken(res.token);
        
                router.push("/");
            }).finally(()=>{
                loading.value = false ;
            })
            */
        });
    }

    const myKeyUp = (e)=>{
        //console.log(e)
        if(e.key == "Enter"){
            obSubmit();
        }
    }
    // 添加键盘监听事件
    onMounted(()=>{
        document.addEventListener("keyup", myKeyUp, true);  
    });
     // 移除键盘监听事件
    onBeforeUnmount(()=>{
        document.removeEventListener("keyup", myKeyUp, true);  
    });
</script>
<template>
    <div>
  <el-row class="login-container ">
    <el-col :lg="16" :md="12" class="left">
        <div>
            <div class="left-title">Welcome</div>
            <div class="left-sub-title">这是一个个人测试学习的网站</div>
        </div>
    </el-col>
    <el-col :lg="8" :md="12"  class="right">
        <h2 class="back">欢迎回来</h2>
        <div class="login-tips">
            <span class="line"></span>
            <span>账户密码登录</span>
            <span class="line"></span>

        </div>
        <el-form ref="formRef" :rules="ruleFs" :model="form"  class="w-[250px]">
            <el-form-item prop="username">
                <el-input v-model="form.username" >
                     <template #prefix>
                        <el-icon><User /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" lable="1" >
                <el-input type="password" v-model="form.password" >
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button round color="#626aef" class="w-[250px]" type="primary"
                @click="obSubmit" :loading="loading">登 录</el-button>
            </el-form-item>
        </el-form>  
    </el-col> 
  </el-row>
  </div>
</template>

<style scoped>
    @import url('../assets/css/login.css');
</style>