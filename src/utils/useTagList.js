import { ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'   
import { useCookies } from '@vueuse/integrations';  

export function useTagList(){

    const route = useRoute();
    const router = useRouter();
    const cookie = useCookies();
    const activeTab = ref(route.path);   
    
    const tabList = ref([
        {
            title: '后台首页',
            path: "/",
            name: '1',
        }
    ])

    // 添加标签导航
    const addTab = (tab) => {
        //
        let noTab = tabList.value.findIndex(t=> t.path==tab.path) == -1 ;
        if (noTab){
            tabList.value.push(tab);
        }
        cookie.set("tabList", tabList.value)
    }

    function initTabList(){
        let tabs = cookie.set("tabList");
        if (tabs){
            tabList.value = tabs;
        }
        router.push("/")
    }

    initTabList();

    onBeforeRouteUpdate((to,from)=>{
        console.log(to);
        activeTab.value = to.path;
        addTab({
            title: to.meta.title,
            path: to.path
        })
    });
    //切换标签
    const changeTab = (t) => {
        router.push(t);
        activeTab.value = t ;
    }


    const removeTab = (t) => {
        let tabs = tabList.value ;
        let a = activeTab.value ;
        console.log('a', a);
        console.log('tabs', tabs);
        if (a==t){
            tabs.forEach((tab, index)=>{
            if(tab.path == t){
                const nextTab = tabs[index+1] || tabs[index-1] ;
                if (nextTab){
                a = nextTab.path ;
                }
            }
            });
        }
        activeTab.value = a ;
        router.push(a);
        tabList.value = tabList.value.filter(tab => tab.path != t);
        cookie.set("tabList", tabList.value);
    }

    const handleCommand = (c)=>{
        console.log(activeTab.value)
        if(c=="colseAll"){
            //激活当前
            activeTab.value = "/";
            // 只保留首页
            tabList.value = [{
            title: '后台首页',
            path: "/",
            name: '1',
            }] ;
        }else if(c=="colseOthers"){
            // 过滤只剩下首页或当前激活的标签页
            tabList.value = tabList.value.filter(t=> t.path=="/"|| t.path==activeTab.value);
        }
        cookie.set("tabList", tabList.value);
    }

    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleCommand
    }
}