<template>
    <div class="simple-wrap" ref="authModule">
        <div class="img-area" :style="'background-image: url(' + background + ')'"></div>
        <div class="slider-area" ref="sliderBar">
            <span>{{ tips }}</span>
            <div class="slider-btn" @mousedown="sliderDown" ref="slider">
                <i class="iconfont icon-zuobian" ref="sliderIcon"></i>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import mouseEvent from "../../abstract/eventSublimation.js";
import statusConvert from "../../abstract/statusConvert.js";
import constant from "../../abstract/constant.js";
import defaultBg0 from "../../../public/slider/default-slider-bg-2.png";

export default {
    name: "as-simple-slider",
    props: {
        // 认证成功后的回调方法
        success: Function,
        // 认证成功后是否自动关闭认证模块
        autoClose: {
            type: Boolean,
            default: true,
        },
        // 滑动提示
        tips: {
            type: String,
            default: "向右滑动滑块，完成认证",
        },
        // 滑动距离与最终距离允许的误差 默认5px
        errorRange: {
            type: Number,
            default: 5
        },
        // 认证模块大小
        size: {
            type: String,
            default: "normal"
        },
        // 背景图片
        background: {
            type: String,
            default: defaultBg0,
        }
    },
    setup(props) {
        const sliderBar = ref(null);
        const slider = ref(null);
        const sliderIcon = ref(null);
        const authModule = ref(null);

        onMounted(() => {
            const fontSize = constant.sizeMap[props.size];
            authModule.value.style.fontSize = `${fontSize}px`;
        });

        let {sliderDown} = sliderGather(sliderBar, slider, sliderIcon, props, authModule);
        return {
            sliderDown,
            sliderBar,
            slider,
            sliderIcon,
            authModule,
        };
    },
}

function sliderGather(sliderBar, slider, sliderIcon, props, authModule) {
    function sliderDown(e) {
        mouseEvent.moveSliderEvent(e, {slider, sliderBar}, (moveLength) => {
            const moveRate = moveLength / (sliderBar.value.offsetWidth - slider.value.offsetWidth) * 100;
            // 完成滑动 判断滑块是否移动到最右端
            if (Math.abs(sliderBar.value.offsetWidth - slider.value.offsetWidth - moveLength) <= props.errorRange) {
                // 如果移动距离和滑块可移动距离之间的差距不足5个像素 则判断认证成功
                statusConvert.changeSuccessStatus(slider, sliderBar, sliderIcon, moveRate);
                // 执行成功后的回调方法
                props.success !== null && props.success !== undefined && props.success(close);
                setTimeout(() => {
                    props.autoClose && close();
                }, constant.successStyleDisplayTime);
                return;
            }
            // 认证失败 提示失败然后将滑块位置归位
            statusConvert.changeFaildStatus(slider, sliderBar, sliderIcon, moveRate);
            setTimeout(() => {
                statusConvert.changeDefaultStatus(slider, sliderBar, sliderIcon);
            }, constant.faildStyleDisplayTime);
        });
    }

    /**
     * 关闭认证模块
     */
    function close() {
        authModule.value.style.opacity = "0";
        setTimeout(() => {
            authModule.value.style.display = "none";
        }, 500);
    }

    return {
        sliderDown,
    };
}
</script>
<style lang="stylus" scoped>
@import "./simpleSlider.styl";
</style>

