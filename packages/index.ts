import type { App } from "vue";
import "./theme-chalk/index.styl";
import SimpleSlider from "./SimpleSlider";
import AsButton from "./AsButton";
import PuzzleSlider from "./PuzzleSlider";
import TextSlider from "./TextSlider";
import AsMessage from "./AsMessage";
import AsCodeBlock from "./AsCodeBlock";
import AsAuthBar from "./AsAuthBar";
import AsRotateSlider from "./RotateSlider";
import PictureCaptcha from "./PictureCaptcha";
import JigsawSlider from "./JigsawSlider";
import AsTop from "./AsTop";
import ScratchSlider from "./ScratchSlider";
import * as iconComponent from "./AsIcons";

// package下组件列表
const components = [
    ...Object.values(iconComponent),
    SimpleSlider,
    AsButton,
    PuzzleSlider,
    TextSlider,
    AsMessage,
    AsCodeBlock,
    AsAuthBar,
    AsRotateSlider,
    PictureCaptcha,
    JigsawSlider,
    AsTop,
    ScratchSlider,
];

// 定义安装方法 如果使用use注册插件，则将package中所有组件注册
const install: any = (app: App) => {
    components.forEach((component: any) => {
        if (component.install) {
            // 执行每个组件的install方法
            app.use(component);
        }
        app.component(component.name, component);
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
    AsCodeBlock,
    AsAuthBar,
    AsRotateSlider,
    PictureCaptcha,
    JigsawSlider,
    AsTop,
    ScratchSlider,
}
