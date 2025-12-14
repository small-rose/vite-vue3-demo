import { createStore } from 'vuex';
import { login, getinfo, logout } from '../api/manager';
import { setToken, removeToken } from '../utils/auth';

const store = createStore({
   state () {
      return {
         user: {}
      }
   },
   mutations: {
      SET_USERINFO(state, user) {
         state.user = user;
      }
   },
   actions: {
        // 登录actions
        login({commit},{username, password}){
            return new Promise((resolve, reject)=>{
            login(username, password).then(res=>{
                setToken(res.data.token);
                resolve(res)
            }).catch(err=>reject(err));
        })
        },
        //登录成功后获取当前用户的登录信息
        getinfo({commit}){
            return new Promise((resolve, reject)=>{
                getinfo().then(res=>{
                    commit("SET_USERINFO",res.data);
                    resolve(res);
                }).catch(err=>reject(err));
            });
        },
        // 登出 actions
        logout({commit}){
            // 移除token
            removeToken();
            // 清除当前用户状态
            commit("SET_USERINFO",{});
        }
        
    },
});

export default store ;