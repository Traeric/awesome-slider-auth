<template>
    <div class="as-rotate-slider-wrap" ref="wrapRef">
        <div class="as-rotate-slider-bg">
            <img class="as-rotate-slider-canvas" ref="bgRef"/>
            <div class="as-rotate-slider-rotate" ref="rotateRef"></div>
            <!-- 加载样式 -->
            <div class="asa-refresh-panel"
            v-show="loadFlag">
                <loading class="asa-load" />
            </div>
            <!-- 刷新按钮 -->
            <refresh class="asa-refresh" @click="refreshPanel()" />
        </div>
        <div class="asa-slider-bar" ref="sliderBar">
            <span class="asa-slider-tips">
                {{tips}}
            </span>
            <div class="asa-slider-progress" ref="progressRef"></div>
            <div class="asa-slider" @mousedown="sliderDown" ref="slider">
                <arrow class="icon-arrow"
                v-if="iconStatus === IconStatus.Normal" />
                <success class="icon-success"
                v-else-if="iconStatus === IconStatus.Success" />
                <fail class="icon-fail"
                v-else-if="iconStatus === IconStatus.Fail" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {moveSliderEvent, close} from "../../utils/eventSublimation.js";
import {defaultBackground1} from "../../utils/pictureAdapter";
import {RotateSliderHandler} from "./RotateSlider";
import statusConvert from "../../utils/statusConvert.js";
import constant from "../../utils/constant.js";
import {IconStatus} from "../../utils/enums";

let props = defineProps({
    tips: {
        type: String,
        default: "拖动滑块将图形旋转到正确位置"
    },
    // 允许的误差范围
    errorRange: {
        type: Number,
        defualt: 5
    },
    // 刷新方法
    refresh: Function,
    // 允许失败次数
    refreshFrequency: {
        type: Number,
        default: 3
    },
    // 成功回调
    success: Function
});

const bgRef = ref();
const slider = ref();
const sliderBar = ref();
const progressRef = ref();
const rotateRef = ref();
const wrapRef = ref();
let iconStatus = ref(IconStatus.Normal);
let loadFlag = ref(false);

let rotateHandler: RotateSliderHandler;
onMounted(() => {
    // 设置背景高度
    bgRef.value.style.height = `${bgRef.value.offsetWidth * 0.5}px`;
    // 初始化slider
    rotateHandler = new RotateSliderHandler(bgRef.value, rotateRef.value, bgRef.value.offsetHeight * 0.6);
    refreshPanel();
});

let failCount = 0;
function sliderDown(e) {
    moveSliderEvent(e, {slider, sliderBar, progressRef}, (moveLength, sliderMoveMostLength) => {
        let authResult: boolean = rotateHandler.auth(moveLength / sliderMoveMostLength, props.errorRange);
        if (authResult) {
            // 认证成功
            statusConvert.changeSuccessStatus(slider.value, progressRef.value, iconStatus);
            // 关闭panel
            setTimeout(() => {
                close(wrapRef.value);
                // 执行成功后的回调
                props.success?.();
            }, constant.successStyleDisplayTime);
        } else {
            // 认证失败
            statusConvert.changeFaildStatus(slider.value, progressRef.value, iconStatus);
            // 将圆圈归位
            rotateHandler.resetRotate();
            setTimeout(() => {
                statusConvert.changeDefaultStatus(slider.value, progressRef.value, iconStatus);
                // 如果失败超过指定次数则刷新位置
                if (props.refreshFrequency <= ++failCount) {
                    refreshPanel();
                }
            }, constant.faildStyleDisplayTime);
        }
    }, (moveLength, sliderMoveMostLength) => {
        rotateHandler.realRotate(moveLength / sliderMoveMostLength);
    });
}

function refreshPanel() {
    // 打开加载样式
    loadFlag.value = true;
    setTimeout(() => {
        (props.refresh || defaultRefresh)(sliderInfo => {
            rotateHandler.initSliderBackground(sliderInfo.background, () => {
                // 关闭加载样式
                loadFlag.value = false;
                failCount = 0;
            });
        });
    }, 200);
}

function defaultRefresh (callbakc: Function) {
    callbakc({
        "background": defaultBackground1,
    });
}
</script>
<script lang="ts">
export default {
    name: "as-rotate-slider"   
}
</script>
