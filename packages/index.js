import SimpleSlider from "./SimpleSlider/src/SimpleSlider.vue";
import AsButton from "./AsButton/src/AsButton.vue";
import PuzzleSlider from "./PuzzleSlider/src/PuzzleSlider.vue";

// package下组件列表
const components = [
    SimpleSlider,
    AsButton,
    PuzzleSlider,
];


// 定义安装方法 如果使用use注册插件，则将package中所有组件注册
const install = (Vue) => {
    if (install.installed) {
        return;
    }

    components.map(component => Vue.component(component.name, component));
} 


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    // 导出对象需要有install才能被Vue.use()方法安装
    install,
    // 导出具体的组件
    SimpleSlider,
    AsButton,
    PuzzleSlider,
}
