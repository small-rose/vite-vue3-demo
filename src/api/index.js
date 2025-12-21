// 从axios实例引入
import axios from "~/axios";


export function getstatics1(){
   return axios.post("/admin/statics1");
}


export function getstatics2(type){
   return axios.post("/admin/statics2?type="+type);
}


export function getstatics3(){
   return axios.post("/admin/statics3");
}