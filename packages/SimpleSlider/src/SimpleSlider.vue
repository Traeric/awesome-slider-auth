<template>
    <div class="click-btn">
        <AuthBar ref="authBarRef">
            <div class="simple-wrap" ref="authModule">
                <div class="img-area" :style="'background-image: url(' + background + ')'" ref="imgRef"></div>
                <div class="slider-area" ref="sliderBar">
                    <span>{{ tips }}</span>
                    <div class="slider-btn" @mousedown="sliderDown" ref="slider">
                        <i class="iconfont icon-zuobian" ref="sliderIcon"></i>
                    </div>
                </div>
            </div>
        </AuthBar>
    </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import mouseEvent from "../../abstract/eventSublimation.js";
import statusConvert from "../../abstract/statusConvert.js";
import constant from "../../abstract/constant.js";
import defaultBg0 from "../../../public/slider/default-slider-bg-2.png";
import AuthBar from "../../components/AuthBar.vue";

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
            default: defaultBg0,
        }
    },
    components: {
        AuthBar,
    },
    setup(props) {
        const sliderBar = ref(null);
        const slider = ref(null);
        const sliderIcon = ref(null);
        const authModule = ref(null);
        const authBarRef = ref();
        const imgRef = ref();

        onMounted(() => {
            const containerWidth = authModule.value.offsetWidth;
            // 设置容器高度
            imgRef.value.style.height = `${0.5 * containerWidth}px`;
        });

        let {sliderDown} = sliderGather(sliderBar, slider, sliderIcon, props, authModule, authBarRef);
        return {
            sliderDown,
            sliderBar,
            slider,
            sliderIcon,
            authModule,
            authBarRef,
            imgRef,
        };
    },
}

function sliderGather(sliderBar, slider, sliderIcon, props, authModule, authBarRef) {
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
                    authBarRef.value.success();
                    close();
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
@import "../../Style/animation.styl"
.simple-wrap
    width 100%
    box-sizing border-box
    border 1px solid #eee
    padding 5px
    overflow hidden
    transition all .5s
    .img-area
        width 100%
        height (150 / 16)em
        background-size cover
        margin-bottom (10 / 16)em
    .slider-area
        width 100%
        height (35 / 16)em
        background linear-gradient(to right, #a0cfff, #a0cfff 0%, #ddd 0%, #ddd)
        position relative
        text-align center
        line-height (35 / 16)em
        .slider-btn
            height calc(2.1875em - 2px)
            width (50 / 16)em
            background-color #fff
            border 1px solid #eee
            position absolute
            top 0
            left 0
            display flex
            justify-content center
            align-items center
            i
                font-size 1.5em
                color #e6e6e6
                transform rotate(180deg)
            &:hover, &:active
                background-color #53a8ff
                border-color #409eff
                cursor move
                i
                    color #fff
        span
            font-size (12 / 16)em
            color #fff
            user-select none
</style>

