<template>
    <div class="as-rotate-slider-wrap">
        <div class="as-rotate-slider-bg">
            <img class="as-rotate-slider-canvas" ref="bgRef"/>
            <div class="as-rotate-slider-rotate" ref="rotateRef"></div>
        </div>
        <div class="as-rotate-slider-bar" ref="sliderBar">
            <span class="as-rotate-slider-tips">
                {{tips}}
            </span>
            <div class="as-rotate-slider-progress" ref="progressRef"></div>
            <div class="as-rotate-slider" @mousedown="sliderDown" ref="slider">
                <i class="iconfont icon-zuobian" ref="iconRef"></i>
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
import statusConvert from "../../utils/statusConvert.js";
import constant from "../../utils/constant.js";

let props = defineProps({
    tips: {
        type: String,
        default: "拖动滑块将图形旋转到正确位置"
    },
    // 允许的误差范围
    errorRange: {
        type: Number,
        defualt: 5
    }
});

const bgRef = ref();
const slider = ref();
const sliderBar = ref();
const progressRef = ref();
const rotateRef = ref();
const iconRef = ref();

let rotateHandler: RotateSliderHandler;
onMounted(() => {
    // 设置背景高度
    bgRef.value.style.height = `${bgRef.value.offsetWidth * 0.5}px`;
    // 初始化slider
    rotateHandler = new RotateSliderHandler(bgRef.value, rotateRef.value, bgRef.value.offsetHeight * 0.6);
    rotateHandler.initSliderBackground(defaultBackground1);
});

function sliderDown(e) {
    mouseEvent.moveSliderEvent(e, {slider, sliderBar, progressRef}, (moveLength, sliderMoveMostLength) => {
        let authResult: boolean = rotateHandler.auth(moveLength / sliderMoveMostLength);
        if (authResult) {
            // 认证成功
            statusConvert.changeSuccessStatus(slider.value, progressRef.value, iconRef.value);
        } else {
            // 认证失败
            statusConvert.changeFaildStatus(slider.value, progressRef.value, iconRef.value);
            // 将圆圈归为
            rotateHandler.resetRotate();
            setTimeout(() => {
                statusConvert.changeDefaultStatus(slider.value, progressRef.value, iconRef.value);
                // puzzleCoverRef.value.style.left = `${leftLimit}px`;
                // puzzleCoverRef.value.style.transition = `left .5s`;
                setTimeout(() => {
                    // puzzleCoverRef.value.style.transition = "none";
                    // 如果失败超过指定次数则刷新位置
                    // if (props.refreshFrequency <= ++failCount) {
                    //     loadFlag.value = true;
                    //     initPuzzlePosition();
                    //     failCount = 0;
                    // }
                }, 500);
            }, constant.faildStyleDisplayTime);
        }
    }, (moveLength, sliderMoveMostLength) => {
        rotateHandler.realRotate(moveLength / sliderMoveMostLength);
    });
}
</script>
<script lang="ts">
export default {
    name: "as-rotate-slider"   
}
</script>
