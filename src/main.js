import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import { router } from './router';
import store from './store';

// 引入图标库 step (1/2)
import * as ElementPlusIconsVue from '@element-plus/icons-vue';


// 引入mock文件
import '~/mock' ;// mock 方式，正式发np布时，注释掉该处即可

const app = createApp(App);


// 引入图标库 step (2/2)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(store);
console.log('挂载路由开始')
app.use(router);
console.log('挂载路由完成')
app.use(ElementPlus);


import 'virtual:windi.css';
import  '~/permission';
import 'nprogress/nprogress.css'

app.mount('#app');
