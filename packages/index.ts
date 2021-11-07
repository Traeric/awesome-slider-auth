import SimpleSlider from "./SimpleSlider/src/SimpleSlider.vue";
import AsButton from "./AsButton/src/AsButton.vue";
import PuzzleSlider from "./PuzzleSlider/src/PuzzleSlider.vue";
import TextSlider from "./TextSlider/src/TextSlider.vue";
import AsMessage from "./AsMessage";
import type { App } from "vue";

// package下组件列表
const components = [
    SimpleSlider,
    AsButton,
    PuzzleSlider,
    TextSlider,
    AsMessage,
];


// 定义安装方法 如果使用use注册插件，则将package中所有组件注册
const install: any = (app: App) => {
    components.forEach((component: any) => {
        // 执行每个组件的use方法
        app.use(component);
        app.component(component.name, component)
    });
} 


export default {
    // 导出对象需要有install才能被Vue.use()方法安装
    install,
}

export {
    // 导出具体的组件
    SimpleSlider,
    AsButton,
    PuzzleSlider,
    TextSlider,
    AsMessage,
}
