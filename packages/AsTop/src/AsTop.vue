<template>
    <div class="as-top" :style="topStyle"
    @click="backToTop" ref="topWrapRef">
        <slot>
            <div class="default">
                <svg class="icon-top" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                    <path d="M0 0h1024v1024H0V0z" fill="#202425" opacity=".01" p-id="9538"></path>
                    <path d="M263.645867 496.7424A34.133333 34.133333 0 0 1 294.161067 477.866667h435.677866a34.133333 34.133333 0 0 1 30.5152 18.875733l111.854934 223.675733A68.266667 68.266667 0 0 1 811.1104 819.2H212.8896a68.266667 68.266667 0 0 1-61.064533-98.781867l111.854933-223.675733zM204.8 887.466667a34.133333 34.133333 0 1 1 68.266667 0v34.133333a34.133333 34.133333 0 1 1-68.266667 0v-34.133333z m580.266667-34.133334a34.133333 34.133333 0 0 0-34.133334 34.133334v34.133333a34.133333 34.133333 0 1 0 68.266667 0v-34.133333a34.133333 34.133333 0 0 0-34.133333-34.133334z"
                    :fill="color || '#FFAA44'"></path>
                    <path d="M273.066667 430.08a341.333333 341.333333 0 0 1 119.1936-259.1744l97.518933-83.626667a34.133333 34.133333 0 0 1 44.4416 0l97.518933 83.626667A341.333333 341.333333 0 0 1 750.933333 430.045867V716.8a238.933333 238.933333 0 1 1-477.866666 0v-286.72z"
                    :fill="color || '#FF7744'" data-spm-anchor-id="a313x.7781069.0.i5"></path>
                    <path d="M477.866667 819.2a34.133333 34.133333 0 1 1 68.266666 0v136.533333a34.133333 34.133333 0 1 1-68.266666 0v-136.533333z"
                    :fill="color || '#FFAA44'"></path>
                    <path d="M512 273.066667a102.4 102.4 0 1 1 0 204.8 102.4 102.4 0 0 1 0-204.8z" fill="#FFFFFF"></path>
                </svg>
            </div>
        </slot>
    </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
let props = defineProps({
    bottom: {
        type: String,
        default: '50px'
    },
    right: {
        type: String,
        default: '50px'
    },
    visibilityHeight: {
        type: Number,
        default: 200
    },
    listenElement: {
        type: [String, HTMLElement, Document],
        default: document
    },
    color: String
});
let visible = ref(false);
let topStyle = computed(() => ({
    'bottom': visible.value ? converUnit(props.bottom) : `-100px`,
    'right': converUnit(props.right)
}));
let scrollDom: HTMLElement | Document;

nextTick(() => {
    if (typeof props.listenElement === "string") {
        scrollDom = document.querySelector(props.listenElement) as HTMLElement;
    } else {
        scrollDom = props.listenElement as HTMLElement | Document;
    }
    if (props.listenElement) {
        scrollDom.addEventListener("scroll", () => {
            let domElement: HTMLElement;
            if (scrollDom instanceof Document) {
                domElement = scrollDom.documentElement;
            } else {
                domElement = scrollDom;
            }
            visible.value = domElement.scrollTop >= props.visibilityHeight;
        }, false);
    }
});

function backToTop() {
    let domElement: HTMLElement;
    if (scrollDom instanceof Document) {
        domElement = scrollDom.documentElement;
    } else {
        domElement = scrollDom;
    }
    domElement.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function converUnit(num: string): string {
    if (/^\d+(\.\d*)?$/.test(num)) {
        // 如果全部是数字 补上默认单位px
        return num + 'px';
    }
    return num;
}
</script>
<script lang="ts">
export default {
    name: "as-top"
}
</script>