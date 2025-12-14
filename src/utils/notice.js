import { ElMessageBox, ElNotification } from "element-plus";
import nProgress from "nprogress";

// 消息提示
export function notice(message, type = "success", dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000,
    })
}


// 消息确认框
export function showConfirm(content = "提示内容", type = "warning", title = "") {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        }
    )
}

// 开启 loading
export function showLoading() {
    nProgress.start();
}

// 关闭 loading
export function hideLoading() {
    nProgress.done();
}