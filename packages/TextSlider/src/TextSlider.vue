<template>
    <AuthBar>
        <div class="text-slider-wrap" ref="textSliderRef">
            <div class="bg">
                <canvas class="bg-canvas" 
                ref="bgCanvasRef"
                @click="drawDot"></canvas>
                <span class="dot" 
                v-for="(item, index) in dotList"
                :key="index"
                :style="{top: `${item.top}px`, left: `${item.left}px`}">{{ item.text }}</span>
                <!-- 刷新按钮 -->
                <i class="iconfont icon-shuaxin1 refresh" @click="refreshPanel"></i>
            </div>
            <div class="auth-bar">
                <span class="text">验证：请</span>
                <span class="tips">按顺序</span>
                <span class="text">点击</span>
                <span class="word">{{textOrder}}</span>
            </div>
        </div>
    </AuthBar>
</template>
<script setup lang="ts">
import { onMounted, reactive, Ref, ref } from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import "../style/index.styl";
import AuthBar from "../../components/AuthBar.vue";
import defaultBackground from "../../../public/slider/bg1.jpg";
import { GenerateText, WordInfo, DotInfo } from "./TextSlider";


const bgCanvasRef = ref<HTMLCanvasElement>() as Ref<HTMLCanvasElement>;
const textSliderRef = ref<HTMLDivElement>() as Ref<HTMLDivElement>;
const textOrder: Ref<string> = ref("");
let generateText: GenerateText;
const dotList: UnwrapNestedRefs<Array<DotInfo>> = reactive<Array<DotInfo>>([]);

onMounted(() => {
    // 设置背景高度
    const containerWidth: number = textSliderRef.value.offsetWidth;
    bgCanvasRef.value.height = 0.5 * containerWidth;
    bgCanvasRef.value.width = containerWidth;

    generateText = new GenerateText(bgCanvasRef.value, dotList);
    refreshPanel();
});

function refreshPanel(): void {
    generateText.refreshCanvas(defaultBackground, () => {
        textOrder.value = "";
        generateText.authWordList.map((wordItem: WordInfo) => {
            textOrder.value += wordItem.word;
        });
    });
}

function drawDot(e: MouseEvent) {
    generateText.drawDot(e, textSliderRef.value);
}

</script>
<script lang="ts">
export default {
    name: "as-text-slider"
}
</script>
<style lang="stylus" scoped>

</style>