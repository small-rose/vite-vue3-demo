import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import WindiCSS from 'vite-plugin-windicss'
import { viteMockServe } from 'vite-plugin-mock';


import path from "path"


// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      // 将 ~ 给当前目录的src 取个别名
      "~": path.resolve(__dirname, "src")
    }
  },
  server:{
    /*
     // 显式设置主机和端口 为了mock 使用
    host: 'localhost',
    port: 5173,
    // 解决 HMR 连接问题的关键配置
    hmr: {
      host: 'localhost',
      port: 5173,
      // 对于某些防火墙或代理环境
      protocol: 'ws',
      // 如果通过反向代理访问
      clientPort: 5173
    },
    */
    // 允许通过局域网访问
    cors: true,
    // 配置代理解决跨域
    proxy: {
      '/api':{
        target: "http://localhost:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
  },
  plugins: [
    vue(), 
    WindiCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue','@vueuse/core']
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }), 
    viteMockServe({
      mockPath: './src/mock', // Mock文件存放目录
      localEnabled: false, // 开发环境启用
      prodEnabled: false, // 生产环境禁用
      watchFiles: true, // 监视文件更改
      logger: true, // 控制台显示请求日志
      supportTs: false // 重要：禁用TS支持
    }),
  ],
})
