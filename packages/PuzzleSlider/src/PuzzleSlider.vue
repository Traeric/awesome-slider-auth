<template>
    <div class="simple-wrap" ref="containerRef">
        <div class="img-area" ref="imgRef">
            <canvas ref="puzzleCoverRef" class="puzzle-cover" @mousedown="sliderDown" :style="cursorStyle"></canvas>
            <canvas ref="puzzleBeCoveredRef"></canvas>
            <img :src="defaultBackground" alt="NO IMG" ref="imgBgRef">
            <!-- 加载样式 -->
            <div class="asa-refresh-panel"
            v-show="loadFlag">
                <loading class="asa-load" />
            </div>
            <!-- 刷新按钮 -->
            <refresh class="asa-refresh" @click="initPuzzlePosition" />
        </div>
        <div class="asa-slider-bar" ref="sliderBar">
            <span class="asa-slider-tips">
                {{tips}}
            </span>
            <div class="asa-slider-progress" ref="progressRef"></div>
            <div class="asa-slider" @mousedown="sliderDown" ref="slider" :style="cursorStyle">
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
import {defaultBackground, blackBackground} from "../../utils/pictureAdapter.js";
import { computed, onMounted, ref } from 'vue';
import {moveSliderEvent} from "../../utils/eventSublimation.js";
import statusConvert from "../../utils/statusConvert.js";
import constant from "../../utils/constant.js";
import {IconStatus} from "../../utils/enums";

const containerRef = ref();
const imgRef = ref();
const puzzleCoverRef = ref();
const puzzleBeCoveredRef = ref();
const slider = ref();
const sliderBar = ref();
const progressRef = ref();
const imgBgRef = ref();
let iconStatus = ref(IconStatus.Normal);
let loadFlag = ref(false);
let preventMove = ref(true);
let cursorStyle = computed(() => ({
    "cursor": preventMove.value ? 'move' : 'not-allowed',
}));

// 父组件传入参数
const props = defineProps({
    tips: {
        type: String,
        default: "移动滑块，完成拼图",
    },
    // 刷新拼图获取新的背景以及拼图位置
    refresh: {
        type: Function,
        default: null
    },
    // 认证时两个滑块之间允许误差范围
    errorRange: {
        type: Number,
        default: 5
    },
    // 认证失败时的刷新频率
    refreshFrequency: {
        type: Number,
        default: 3
    },
    // 成功后的回调
    success: {
        type: Function,
        default: null
    },
});

// 限制拼图最左侧的位置
const leftLimit = 10;
// 底色图片 用于被覆盖的拼图
const beCoveredImgData = new Image();
beCoveredImgData.src = blackBackground;
const rate = 1.3;
let failCount = 0;
onMounted(() => {
    // 设置图片高度等于宽度的一半
    const containerWidth = containerRef.value.offsetWidth;
    imgRef.value.style.height = `${0.5 * containerWidth}px`;
    // 初始化拼图位置
    initPuzzlePosition();
});


// 移动底部滑块事件
function sliderDown(e) {
    if (!preventMove.value) {
        return;
    }
    moveSliderEvent(e, {slider, sliderBar, progressRef}, (moveLength) => {
        // 完成滑动 判断两个拼图是否合并在一起
        const coverLeft = parseInt(puzzleCoverRef.value.style.left.replace('px', ''));
        const beCoveredLeft = parseInt(puzzleBeCoveredRef.value.style.left.replace('px', ''));
        if (Math.abs(coverLeft - beCoveredLeft) <= props.errorRange) {
            statusConvert.changeSuccessStatus(slider.value, progressRef.value, iconStatus);
            setTimeout(() => {
                // 关闭认证模块
                close();
                // 执行成功后的回调方法
                props.success?.();
            }, constant.successStyleDisplayTime);
            return;
        }
        // 认证失败 提示失败然后将滑块位置归位
        statusConvert.changeFaildStatus(slider.value, progressRef.value, iconStatus);
        puzzleCoverRef.value.style.left = `${leftLimit}px`;
        puzzleCoverRef.value.style.transition = `left .5s`;
        preventMove.value = false;
        setTimeout(() => {
            statusConvert.changeDefaultStatus(slider.value, progressRef.value, iconStatus, () => {
                puzzleCoverRef.value.style.transition = "none";
                // 如果失败超过指定次数则刷新位置
                if (props.refreshFrequency <= ++failCount) {
                    loadFlag.value = true;
                    initPuzzlePosition();
                    failCount = 0;
                }
                preventMove.value = true;
            });
        }, constant.faildStyleDisplayTime);
    }, (moveLenth, mostMoveLength) => {
        // 计算滑块和拼图的移动比
        const moveRate = (imgRef.value.offsetWidth - initPuzzleSize() - 2 - leftLimit) / mostMoveLength;
        // 移动拼图
        puzzleCoverRef.value.style.left = `${moveRate * moveLenth + leftLimit}px`;
    });
}

/**
 * 销毁当前认证模块
 */
function close() {
    containerRef.value.style.opacity = "0";
    setTimeout(() => {
        containerRef.value.style.display = "none";
    }, 500);
}


/**
 * 初始化拼图位置
 */
function initPuzzlePosition() {
    loadFlag.value = true;
    setTimeout(() => {
        // 初始化拼图
        const refreshFunc = props.refresh || defaultRefresh;
        refreshFunc(position => {
            // 限制拼图位置不能超过能显示的区域
            position.x = Math.max(leftLimit + initPuzzleSize() - 2, position.x);
            position.x = Math.min(imgRef.value.offsetWidth - initPuzzleSize() - 2, position.x);
            position.y = Math.max(0, position.y);
            position.y = Math.min(imgRef.value.offsetHeight - initPuzzleSize() - 2, position.y);
            // 设置背景
            imgBgRef.value.setAttribute('src', position.background);
            imgBgRef.value.onload = () => {
                    // 准备待覆盖的puzzle
                    drawPuzzle(puzzleCoverRef.value, imgBgRef.value, "#E6A23C", {
                        x: -position.x,
                        y: -position.y,
                        width: imgRef.value.offsetWidth,
                        height: imgRef.value.offsetHeight
                    });
                    // 设置覆盖的puzzle位置
                    puzzleCoverRef.value.style.left = `${leftLimit}px`;
                    puzzleCoverRef.value.style.top = `${position.y}px`;
                    // 准备被覆盖的puzzle
                    drawPuzzle(puzzleBeCoveredRef.value, beCoveredImgData, "rgba(255, 255, 255, .5)");
                    // 设置被覆盖的puzzle位置
                    puzzleBeCoveredRef.value.style.left = `${position.x}px`;
                    puzzleBeCoveredRef.value.style.top = `${position.y}px`;
                    loadFlag.value = false;
            }
        });
    }, 200);
}

/**
 * 如果用户未定义refresh方法 则使用默认的方式生成拼图随机位置
 */
function defaultRefresh(callback) {
    callback({
        x: Math.ceil(leftLimit + initPuzzleSize() + Math.random() * (imgRef.value.offsetWidth - 2 * initPuzzleSize())),
        y: Math.ceil(Math.random() * (imgRef.value.offsetHeight - initPuzzleSize())),
        background: defaultBackground,
    });
}

/**
 * 初始化拼图大小
 */
function initPuzzleSize() {
    const unit = 50;
    const cl = unit * rate;
    return cl;
}


/**
 * 画拼图方法
 */
function drawPuzzle(canvas, imageData, borderStyle = "#67C23A", position: any = null, rate = 1.3) {
    const cl = initPuzzleSize();
    canvas.width = cl + 2;
    canvas.height = cl + 2;
    // 设置圆的直径以及正方形的边长
    const sideLen = cl / 5 * 3.8;
    const diameter = cl / 5 * 1.2;
    // x跟y轴整体移动距离
    const xOffset = 2
    const yOffset = 0;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    // 设置线段效果
    ctx.moveTo(xOffset, diameter + yOffset);
    // 上边中线
    ctx.lineTo(sideLen / 2 + xOffset, diameter + yOffset);
    // 画上面的圆
    ctx.arc(sideLen / 2 + xOffset, diameter / 2 + 2 + yOffset, diameter / 2, 0, 2 * Math.PI);
    ctx.lineTo(sideLen / 2 + xOffset, diameter + yOffset);
    // 上边另外的中线
    ctx.lineTo(sideLen + xOffset, diameter + yOffset);
    // 右边中线
    ctx.lineTo(sideLen + xOffset, diameter + sideLen / 2 + yOffset);
    // 右边的圆
    ctx.arc(sideLen + diameter / 2 - 2 + xOffset, diameter + sideLen / 2 + yOffset, diameter / 2, 0, 2 * Math.PI);
    ctx.lineTo(sideLen + xOffset, diameter + sideLen / 2 + yOffset);
    // 右边下段中线
    ctx.lineTo(sideLen + xOffset, cl + yOffset);
    // 下面的线
    ctx.lineTo(xOffset, cl + yOffset);
    // 左边的下半段线
    ctx.lineTo(xOffset, diameter + sideLen / 2 + 5 + yOffset);
    ctx.arc(diameter / 2 - 2 + xOffset, diameter + sideLen / 2 + yOffset, diameter / 2, 0.8 * Math.PI, 1.2 * Math.PI, true);
    ctx.lineTo(xOffset, diameter + sideLen / 2 + - 5 + yOffset);
    ctx.lineTo(xOffset, diameter + yOffset);
    // 线条样式
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = borderStyle;
    ctx.stroke();
    ctx.clip();
    // 给图片位置设置默认值
    position = position || {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height
    };
    ctx.drawImage(imageData, position.x, position.y, position.width, position.height);
} 
</script>
<script lang="ts">
export default {
    name: "as-puzzle-slider",
}
</script>

