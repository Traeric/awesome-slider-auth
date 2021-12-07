<template>
    <div class="as-scratch-slider">
        <div class="bg" ref="bgRef">
            <canvas class="auth-canvas" ref="authCanvasRef">您的浏览器不支持使用canvas，请使用其他浏览器访问。</canvas>
            <canvas class="shadow-canvas" ref="shadowCanvasRef">您的浏览器不支持使用canvas，请使用其他浏览器访问。</canvas>
            <!-- 刷新样式 -->
            <div class="asa-refresh-panel"
            v-show="refreshFlag">
                <loading class="asa-load" />
            </div>
        </div>
        <div class="asa-slider-bar scratch-slider-bar">
            <span class="text">验证：请尽可能简洁的</span>
            <span class="tips">刮出</span>
            <span class="text">图案</span>
            <div class="error-tips" ref="errorTipRef">
                <error class="asa-error" />
                验证失败，请重试
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {defaultBackground1} from "../../utils/pictureAdapter.js";
import {ScratchHandler} from "./ScratchSlider";

let props = defineProps({
    refresh: Function,
    success: Function,
});

const authCanvasRef = ref();
const shadowCanvasRef = ref();
const bgRef = ref();
const errorTipRef = ref();
let refreshFlag = ref(true);
let scratchHandler: ScratchHandler;

onMounted(() => {
    bgRef.value.style.height = `${bgRef.value.offsetWidth * 0.5}px`;
    authCanvasRef.value.width = bgRef.value.offsetWidth;
    authCanvasRef.value.height = bgRef.value.offsetHeight;
    shadowCanvasRef.value.width = bgRef.value.offsetWidth;
    shadowCanvasRef.value.height = bgRef.value.offsetHeight;

    // 初始化
    scratchHandler = new ScratchHandler(bgRef.value, authCanvasRef.value, shadowCanvasRef.value);
    refreshFunc(() => refreshFlag.value = false);
});

function refreshFunc(callback?: Function) {
    let refreshFunction = props.refresh || ((callback: Function) => {
        callback({
            "background": defaultBackground1,
        });
    });

    refreshFunction((refreshObj: Map<String, String>) => {
        scratchHandler.initPanel(refreshObj['background'], () => {
            scratchHandler.shadowClickEvent(() => {
                // 认证成功
                props.success?.();
                shadowCanvasRef.value.onmousedown = null;
            }, () => {
                // 认证失败
                errorTipRef.value.style.display = "block";
                refreshFlag.value = true;
                setTimeout(() => {
                    refreshFunc(() => {
                        // 清除失败样式
                        refreshFlag.value = false;
                        errorTipRef.value.style.display = "none";
                    });
                }, 200);
            });
            callback?.();
        });
    });
}
</script>
<script lang="ts">
export default {
    name: "as-scratch-slider"
}
</script>
