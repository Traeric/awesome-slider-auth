<template>
    <AuthBar ref="authBarRef">
        <div class="text-slider-wrap" ref="textSliderRef">
            <div class="bg">
                <canvas class="bg-canvas" 
                ref="bgCanvasRef"></canvas>
                <span class="dot" 
                v-for="(item, index) in dotList"
                :key="index"
                :style="{top: `${item.top}px`, left: `${item.left}px`}">{{ item.text }}</span>
                <!-- 刷新按钮 -->
                <i class="iconfont icon-shuaxin1 asa-refresh" @click="refreshPanel()"></i>
                <!-- 刷新样式 -->
                <div class="asa-refresh-panel"
                v-show="refreshFlag">
                    <i class="iconfont icon-jiazaizhong2"></i>
                </div>
            </div>
            <div class="auth-bar">
                <span class="text">验证：请</span>
                <span class="tips">按顺序</span>
                <span class="text">点击</span>
                <span class="word">{{textOrder}}</span>
            </div>
            <div class="error-tips" ref="errorTipRef">
                <i class="iconfont icon-shibai"></i>验证失败，请按提示重新认证
            </div>
        </div>
    </AuthBar>
</template>
<script setup lang="ts">
import { onMounted, reactive, Ref, ref } from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import "../style/index.styl";
import defaultBackground from "./InputAdapter.js";
import AuthBar from "./TextSlider";
import { GenerateText, WordInfo, DotInfo } from "./TextSlider";


const bgCanvasRef = ref();
const textSliderRef = ref();
const textOrder: Ref<string> = ref("");
let generateText: GenerateText;
const dotList: UnwrapNestedRefs<Array<DotInfo>> = reactive<Array<DotInfo>>([]);
const authBarRef = ref();
const errorTipRef = ref();
const refreshFlag = ref(false);

const props = defineProps({
    // 刷新方法
    refresh: Function,
    // 认证成功
    success: Function,
});

onMounted(() => {
    // 设置背景高度
    const containerWidth: number = textSliderRef.value.offsetWidth;
    bgCanvasRef.value.height = 0.5 * containerWidth;
    bgCanvasRef.value.width = containerWidth;

    generateText = new GenerateText(bgCanvasRef.value, dotList);
    refreshPanel();

    // 设置canvas点击事件
    const canvasClick = (e: MouseEvent) => {
        generateText.drawDot(e, textSliderRef.value, () => {
            // 认证成功
            authBarRef.value.success();
            close();
            props.success && props.success();
        }, () => {
            // 显示失败样式
            errorTipRef.value.style.display = "block";
            refreshFlag.value = true;
            // 认证失败
            setTimeout(() => {
                refreshPanel(() => {
                    // 清除失败样式
                    errorTipRef.value.style.display = "none";
                    // 恢复点击事件
                    bgCanvasRef.value.onclick = canvasClick;
                });
            }, 500);
        });
    }

    bgCanvasRef.value.onclick = canvasClick;
});

/**
 * 刷新面板
 */
function refreshPanel(refreshSuccess?: Function): void {
    // 显示加载样式
    refreshFlag.value = true;
    const refreshFunc: Function = props.refresh || defaultRefreshFunc;
    setTimeout(() => {
        refreshFunc(refreshObj => {
            generateText.refreshCanvas(refreshObj.background, () => {
                textOrder.value = "";
                generateText.authWordList.map((wordItem: WordInfo) => {
                    textOrder.value += wordItem.word;
                });
                // 关闭加载样式
                refreshFlag.value = false;
                refreshSuccess && refreshSuccess();
            });
        });
    }, 200);
}

/**
 * 默认的刷新方法
 */
function defaultRefreshFunc(callback: Function): void {
    callback({
        "background": defaultBackground
    });
}

function close() {
    textSliderRef.value.style.opacity = "0";
    setTimeout(() => {
        textSliderRef.value.style.display = "none";
    }, 500);
}
</script>
<script lang="ts">
export default {
    name: "as-text-slider"
}
</script>
