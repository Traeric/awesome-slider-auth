import DefaultSlider from "./DefaultSlider/src/DefaultSlider.vue";

// package下组件列表
const components = [
    DefaultSlider
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
    DefaultSlider
}
