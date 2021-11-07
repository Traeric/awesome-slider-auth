import type { App } from "vue";
import AsMessage from "./src/AsMessage";

(<any>AsMessage).install = (app: App) => {
    // 方便this.$as_message调用
    app.config.globalProperties.$as_message = AsMessage;
}

// 用户按需导入
export {
    AsMessage,
}

export default AsMessage;
