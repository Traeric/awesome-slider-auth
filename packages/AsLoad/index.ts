import { App } from "vue";
import AsLoad, {LoadHandler} from "./src/AsLoad";

(AsLoad as any).install = (app: App) => {
    app.config.globalProperties.$as_load = AsLoad;
}

export {
    AsLoad,
    LoadHandler,
}

export default AsLoad;
