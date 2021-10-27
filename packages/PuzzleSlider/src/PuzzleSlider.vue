<template>
    <AuthBar>
        <div class="simple-wrap" ref="containerRef">
            <div class="img-area" ref="imgRef" :style="'background-image: url(' + background + ')'"></div>
            <div class="slider-area">
                <span>{{ tips }}</span>
                <div class="slider-btn">
                    <i class="iconfont icon-zuobian"></i>
                </div>
            </div>
        </div>  
    </AuthBar>
</template>
<script setup>
import AuthBar from "../../components/AuthBar.vue";
import background from "../../../public/slider/default-slider-bg-2.png";
import { onMounted, ref } from '@vue/runtime-core';

const containerRef = ref();
const imgRef = ref();

onMounted(() => {
    const containerWidth = containerRef.value.offsetWidth;
    imgRef.value.style.height = `${0.5 * containerWidth}px`;
});

defineProps({
    tips: {
        type: String,
        default: "移动滑块，完成拼图",
    },
});

</script>
<script>
export default {
    name: "as-puzzle-slider",
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
