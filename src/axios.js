import axios from "axios";
import { ElNotification} from 'element-plus';
import { getToken } from  '~/utils/auth'
import { notice } from  '~/utils/notice'

// 创建 axios 示实例
const service = axios.create({
    // 走代理
    baseURL:"/api"
});


// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在请求发出之前做点什么
    // 请求头添加token
    var token = getToken();
    if (token){
        config.headers['X-token'] = token ;
    }
    
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    if(error.response){
        switch (error.response.status) {
            case 401:
                notice("禁止未授权操作","error"); 
            case 500:
                notice(error.response.data.message || "请求失败","error"); 
                break;
        }
    }
    
    return Promise.reject(error);
});


export default service ;