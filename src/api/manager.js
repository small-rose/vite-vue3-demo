// 从axios实例引入
import axios from "~/axios";


export function login(username, password){
   return axios.post("/admin/auth/login",{
        username, password
    })
}

export function getinfo(){
   return axios.post("/admin/auth/getinfo");
}

export function logout(){
   return axios.post("/admin/auth/logout");
}


export function updatePassword(data){
   return axios.post("/admin/auth/updatePassword",data);
}


