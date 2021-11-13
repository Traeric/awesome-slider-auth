<template>
    <div class="as-rotate-slider-wrap">
        <div class="as-rotate-slider-bg">
            <canvas class="as-rotate-slider-canvas" ref="bgRef"></canvas>
            <div class="as-rotate-slider-rotate" ref="rotateRef"></div>
        </div>
        <div class="as-rotate-slider-bar" ref="sliderBar">
            <span class="as-rotate-slider-tips">
                {{tips}}
            </span>
            <div class="as-rotate-slider-progress" ref="progressRef"></div>
            <div class="as-rotate-slider" @mousedown="sliderDown" ref="slider">
                <i class="iconfont icon-zuobian"></i>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import "../style/AsRotateSlider.styl";
import mouseEvent from "../../utils/eventSublimation.js";
import {defaultBackground1} from "../../utils/pictureAdapter";
import {RotateSliderHandler} from "./RotateSlider";

let props = defineProps({
    tips: {
        type: String,
        default: "拖动滑块将图形旋转到正确位置"
    },
    
});

const bgRef = ref();
const slider = ref();
const sliderBar = ref();
const progressRef = ref();
const rotateRef = ref();

let rotateHandler: RotateSliderHandler;
onMounted(() => {
    // 设置背景高度
    bgRef.value.style.height = `${bgRef.value.offsetWidth * 0.5}px`;
    // 初始化slider
    rotateHandler = new RotateSliderHandler(bgRef.value, rotateRef.value, bgRef.value.offsetHeight * 0.6);
    rotateHandler.initSliderBackground(defaultBackground1);
});

function sliderDown(e) {
    mouseEvent.moveSliderEvent(e, {slider, sliderBar, progressRef}, (moveLength) => {
        
    });
}
</script>
<script lang="ts">
export default {
    name: "as-rotate-slider"   
}
</script>
