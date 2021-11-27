<template>
    <div class="jigsaw-slider-wrap" ref="jigsawSliderRef">
        <div class="bg" ref="bgRef">
            <div class="wrap">
                <div class="block left-top">
                    <div class="position">
                        <span class="serial">1</span>
                    </div>
                </div>
                <div class="block right-top">
                    <div class="position">
                        <span class="serial">2</span>
                    </div>
                </div>
                <div class="block left-bottom">
                    <div class="position">
                        <span class="serial">3</span>
                    </div>
                </div>
                <div class="block right-bottom">
                    <div class="position">
                        <span class="serial">4</span>
                    </div>
                </div>
                <div class="back back-left-top"></div>
                <div class="back back-right-top"></div>
                <div class="back back-left-bottom"></div>
                <div class="back back-right-bottom"></div>
            </div>
            <!-- 刷新按钮 -->
            <i class="iconfont icon-shuaxin1 asa-refresh" @click="refreshFunc()"></i>
            <!-- 刷新样式 -->
            <div class="asa-refresh-panel"
            v-show="refreshFlag">
                <i class="iconfont icon-jiazaizhong2"></i>
            </div>
        </div>
        <div class="asa-slider-bar jigsaw-slider-bar">
            <span class="text">验证：请</span>
            <span class="tips">拖动区块</span>
            <span class="text">得到完整的图片</span>
            <div class="error-tips" ref="errorTipRef">
                <i class="iconfont icon-shibai"></i>
                验证失败，请重新拼图完成认证
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { defaultBackground1 } from "../../utils/pictureAdapter.js";
import JigsawHandler from "./JigsawSlider";

let props = defineProps({
    /**
     * 刷新方法
     */
    refresh: Function,
    /**
     * 成功后的回调方法
     */
    success: Function
});

const bgRef = ref();
const errorTipRef = ref();
const jigsawSliderRef = ref();
let refreshFlag = ref(false);
let jigsawHandler: JigsawHandler;

onMounted(() => {
    // 设置背景大小
    bgRef.value.style.height = `${bgRef.value.offsetWidth * .5}px`;
    // 设置区块大小
    let backs = bgRef.value.querySelectorAll(".back");
    for (let i = 0; i < backs.length; i++) {
        backs[i].style.height = `${bgRef.value.offsetHeight * 0.5 - 12}px`;
        backs[i].style.width = `${bgRef.value.offsetWidth * 0.5 - 12}px`;
    }
    // 设置css变量
    bgRef.value.style.setProperty("--offset-width", bgRef.value.offsetWidth / 2 + 'px');
    bgRef.value.style.setProperty("--offset-height", bgRef.value.offsetHeight / 2 + 'px');

    // 初始化处理类
    jigsawHandler = new JigsawHandler(bgRef.value);
    // 初始化
    refreshFunc();
    // 设置拖拽事件
    jigsawHandler.moveEvent(() => {
        // 认证成功
        close();
        props.success?.();
    }, () => {
        // 认证失败
        errorTipRef.value.style.display = "block";
        refreshFunc(() => {
            // 刷新完成后的回调中关闭错误提示
            errorTipRef.value.style.display = "none";
        });
    });
});

/**
 * 刷新方法
 */
function refreshFunc(callback?: Function) {
    refreshFlag.value = true;
    setTimeout(() => {
        (props.refresh || ((callback: Function) => {
            callback({
                "background": defaultBackground1
            });
        }))((data: Map<String, String>) => {
            jigsawHandler.initPanel(data['background'], () => {
                refreshFlag.value = false;
                callback?.();
            });
        });
    }, 200);
}

function close() {
    jigsawSliderRef.value.style.opacity = "0";
    setTimeout(() => {
        jigsawSliderRef.value.style.display = "none";
    }, 500);
}
</script>
<script lang="ts">
export default {
    name: "as-jigsaw-slider"
}
</script>

