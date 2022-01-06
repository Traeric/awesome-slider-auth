import {InputData} from "./AsLoadOptions.types";
import AsLoadComponent from "./AsLoad.vue";
import { createVNode, render } from "vue";

export default function (args: InputData | string = "加载中..."): LoadHandler | null {
    let argsOption: InputData;
    if (typeof args === "string") {
        argsOption = {
            description: args
        };
    } else {
        argsOption = args;
    }

    // 获取load组件要展示的父级对象
    let parentDom: HTMLElement = document.body;
    if (argsOption.target !== undefined) {
        if (typeof argsOption.target === "string") {
            let parDom = document.querySelector(argsOption.target);
            if (parDom === null) {
                return null;
            }
            parentDom = parDom as HTMLElement;
        } else {
            parentDom = argsOption.target;
        }
    }
    // 设置父级对象定位
    parentDom.style.position = "relative";
    // 将load组件插入父级组件下
    const vm = createVNode(AsLoadComponent, argsOption);
    // 创建挂载点 将组件挂载到挂载点上
    const container = document.createElement('div');
    render(vm, container);
    if (container.firstElementChild === null) {
        return null;
    }
    let currentDom: HTMLElement = container.firstElementChild as HTMLElement;
    currentDom.style.visibility = "hidden";
    if (argsOption.target === undefined) {
        // 如果根节点是body需要特殊处理
        currentDom.style.position = 'fixed';
    }
    parentDom.appendChild(container.firstElementChild);
    const loadHandler: LoadHandler = new LoadHandler(argsOption, container, currentDom);
    return loadHandler;
}


class LoadHandler {
    private argsOption: InputData;
    private container: Element;
    private currentDom: HTMLElement;

    constructor(argsOption: InputData, container: Element, currentDom: HTMLElement) {
        this.argsOption = argsOption;
        this.container = container;
        this.currentDom = currentDom;

    }

    public show(): void {
        if (this.argsOption.target === undefined) {
            // 如果根节点是body需要特殊处理
            document.body.style.overflow = 'hidden';
        }
        this.currentDom.style.transition = 'none';
        this.currentDom.style.visibility = 'visible';
        this.currentDom.style.opacity = '1';
    }

    public close(): void {
        this.currentDom.style.transition = 'all .5s';
        this.currentDom.style.opacity = '0';
        this.currentDom.style.visibility = 'hidden';
        if (this.argsOption.target === undefined) {
            document.body.style.overflow = 'auto';
        }
    }

    public destroy(): void {
        this.close();
        setTimeout(() => {
            render(null, this.container);
        }, 500);
    }
}

export {
    LoadHandler
};
