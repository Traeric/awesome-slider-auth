<template>
    <div class="puzzle-slider-wrap" ref="containerRef">
        <div class="img-area" ref="imgRef">
            <canvas ref="puzzleCoverRef" class="puzzle-cover" @mousedown="sliderDown" :style="cursorStyle"></canvas>
            <canvas class="bg-cover" ref="bgCoverRef"></canvas>
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
import {defaultBackground} from "../../utils/pictureAdapter.js";
import { computed, onMounted, ref } from 'vue';
import {moveSliderEvent} from "../../utils/eventSublimation.js";
import statusConvert from "../../utils/statusConvert.js";
import constant from "../../utils/constant.js";
import {IconStatus} from "../../utils/enums";

const containerRef = ref<HTMLDivElement>();
const imgRef = ref();
const puzzleCoverRef = ref();
const slider = ref();
const sliderBar = ref();
const progressRef = ref();
const bgCoverRef = ref<HTMLCanvasElement>();
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
const rate = 1.3;
let failCount = 0;
// 背景图片
let bgImageData: HTMLImageElement;
type callbackData = {
    x: number,
    y: number,
    background: string
};
onMounted(() => {
    if (bgCoverRef.value !== undefined && containerRef.value !== undefined) {
        // 设置背景高度等于宽度的一半
        imgRef.value.style.height = `${0.5 * containerRef.value.offsetWidth}px`;
        bgCoverRef.value.height = 0.5 * containerRef.value.offsetWidth;
        bgCoverRef.value.width = containerRef.value.offsetWidth;
        bgImageData = new Image(containerRef.value.offsetWidth, 0.5 * containerRef.value.offsetWidth);
        // 初始化拼图位置
        initPuzzlePosition();
    }
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
    if (containerRef.value !== undefined) {
        containerRef.value.style.opacity = "0";
        setTimeout(() => {
            containerRef.value!.style.display = "none";
        }, 200);
    }
}


/**
 * 初始化拼图位置
 */
function initPuzzlePosition() {
    loadFlag.value = true;
    setTimeout(() => {
        // 初始化拼图
        const refreshFunc = props.refresh || defaultRefresh;
        refreshFunc((position: callbackData) => {
            // 限制拼图位置不能超过能显示的区域
            position.x = Math.max(leftLimit + initPuzzleSize() - 2, position.x);
            position.x = Math.min(imgRef.value.offsetWidth - initPuzzleSize() - 2, position.x);
            position.y = Math.max(0, position.y);
            position.y = Math.min(imgRef.value.offsetHeight - initPuzzleSize() - 2, position.y);
            // 设置背景
            bgImageData.src = position.background;
            // 元素的跨域资源请求不需要凭证标志设置 防止使用其它网站图片时出现跨域问题
            bgImageData.crossOrigin = "anonymous";
            bgImageData.onload = () => {
                bgCoverRef.value!.getContext('2d')!
                .drawImage(bgImageData, 0, 0, bgCoverRef.value!.offsetWidth, bgCoverRef.value!.offsetHeight);
                // 准备待覆盖的puzzle
                drawPuzzle(puzzleCoverRef.value, bgImageData, "#E6A23C", {
                    x: -position.x,
                    y: -position.y,
                    width: imgRef.value.offsetWidth,
                    height: imgRef.value.offsetHeight
                });
                // 设置覆盖的puzzle位置
                puzzleCoverRef.value.style.left = `${leftLimit}px`;
                puzzleCoverRef.value.style.top = `${position.y}px`;
                // // 准备被覆盖的puzzle
                // drawPuzzle(puzzleBeCoveredRef.value, beCoveredImgData, "rgba(255, 255, 255, .5)");
                // // 设置被覆盖的puzzle位置
                // puzzleBeCoveredRef.value.style.left = `${position.x}px`;
                // puzzleBeCoveredRef.value.style.top = `${position.y}px`;
                loadFlag.value = false;
            }
        });
    }, 200);
}

/**
 * 如果用户未定义refresh方法 则使用默认的方式生成拼图随机位置
 */
function defaultRefresh(callback: (data: callbackData) => void): void {
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
type drawPuzzleData = {
    x: number,
    y: number,
    width: number,
    height: number
};
function drawPuzzle(canvas: HTMLCanvasElement, imageData: CanvasImageSource, borderStyle: string = "#67C23A", position: drawPuzzleData | null = null, rate = 1.3) {
    const cl = initPuzzleSize();
    canvas.width = cl + 2;
    canvas.height = cl + 2;
    // 设置圆的直径以及正方形的边长
    const sideLen = cl / 5 * 3.8;
    const diameter = cl / 5 * 1.2;
    // x跟y轴整体移动距离
    const xOffset = 2
    const yOffset = 0;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
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

