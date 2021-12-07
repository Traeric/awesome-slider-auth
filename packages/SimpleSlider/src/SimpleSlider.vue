<template>
    <div class="simple-wrap" ref="authModule">
        <div class="img-area" :style="'background-image: url(' + background + ')'" ref="imgRef"></div>
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
<script lang="ts">
import { onMounted, ref } from 'vue';
import {moveSliderEvent} from "../../utils/eventSublimation.js";
import statusConvert from "../../utils/statusConvert.js";
import constant from "../../utils/constant.js";
import {defaultBackground} from "../../utils/pictureAdapter.js";
import {IconStatus} from "../../utils/enums";

export default {
    name: "as-simple-slider",
    props: {
        // 认证成功后的回调方法
        success: Function,
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
        // 背景图片
        background: {
            type: String,
            default: defaultBackground,
        }
    },
    setup(props) {
        const sliderBar = ref(null);
        const slider = ref(null);
        const authModule = ref();
        const imgRef = ref();
        const progressRef = ref();
        let iconStatus = ref(IconStatus.Normal);

        onMounted(() => {
            const containerWidth = authModule.value.offsetWidth;
            // 设置容器高度
            imgRef.value.style.height = `${0.5 * containerWidth}px`;
        });

        let {sliderDown} = sliderGather(sliderBar, progressRef, slider, iconStatus, props, authModule);
        return {
            sliderDown,
            sliderBar,
            slider,
            iconStatus,
            authModule,
            imgRef,
            progressRef,
            IconStatus
        };
    },
}

function sliderGather(sliderBar, progressRef, slider, iconStatus, props, authModule) {
    function sliderDown(e) {
        moveSliderEvent(e, {slider, sliderBar, progressRef}, (moveLength) => {
            // 完成滑动 判断滑块是否移动到最右端
            if (Math.abs(sliderBar.value.offsetWidth - slider.value.offsetWidth - moveLength) <= props.errorRange) {
                // 如果移动距离和滑块可移动距离之间的差距不足5个像素 则判断认证成功
                statusConvert.changeSuccessStatus(slider.value, progressRef.value, iconStatus);
                // 执行成功后的回调方法
                props.success?.(close);
                setTimeout(() => {
                    close();
                }, constant.successStyleDisplayTime);
                return;
            }
            // 认证失败 提示失败然后将滑块位置归位
            statusConvert.changeFaildStatus(slider.value, progressRef.value, iconStatus);
            setTimeout(() => {
                statusConvert.changeDefaultStatus(slider.value, progressRef.value, iconStatus);
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

