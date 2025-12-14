import { logout, updatePassword } from '~/api/manager';
import { notice, showConfirm} from '~/utils/notice';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, reactive } from 'vue';

// 修改密码 
export function useRepassword(){
     
    const store = useStore();
    const router = useRouter();

    const formDrawerRef = ref(null);
    const form = reactive({
        oldpassword:"",
        password:"",
        repassword:""
    })

    const ruleFs = reactive({
        oldpassword: [
            {required: true, message:"旧密码不能为空", trigger:'blur'}
        ],
        password: [
            {required: true, message:"新密码不能为空", trigger:'blur'},
            {min: 6, message:"新密码不能少于6位", trigger:'blur'}
        ],
        repassword: [
            {required: true, message:"密码不能为空", trigger:'blur'},
            {min: 6, message:"新密码二次验证失败", trigger:'blur'}
        ]
    });
    const formRef = ref(null); 
    const onSubmit = ()=>{

        formRef.value.validate(valid=>{

            if(!valid){
                console.log(' valied failed !')
                return;
            }
            formDrawerRef.value.loadingShow()
            updatePassword(form).then(res=>{
                console.log(res)
                if(res.code ==200){    
                    notice("修改密码成功，请重新登录");
                    store.dispatch("logout");
                    router.push("/login");
                }else{
                    notice( res.message||"修改密码失败", 'error');
                }
            }).finally(()=>{
                formDrawerRef.value.loadingHide();
            })
        });
    }

    const openRepassForm = ()=> formDrawerRef.value.open();
    return {
        formDrawerRef,
        form,
        formRef,
        ruleFs,
        onSubmit,
        openRepassForm,
    }
}


// 退出登录 
export function useLogout(){
    const store = useStore();
    const router = useRouter();
    const handleLogout = ()=>{
        showConfirm("是否要退出登录？").then(res=>{
            //
            logout().finally(()=>{
                // 移除 cookie 里面的 token
                // 清除 vuex 用户状态
                store.dispatch("logout");
                // 提示登出成功
                notice("退出登录成功！");
                //跳转登录首页
                router.push("/login");    
                
            })
        });
    }
    return {
        handleLogout
    }   
}