<template>
    <div class="simple-wrap">
        <div class="img-area" :style="'background-image: url(' + bgArray[0] + ')'"></div>
        <div class="slider-area">
            <span>向右滑动滑块，完成认证</span>
            <div class="slider-btn">
                <i class="iconfont icon-jiantou-shuangyou"></i>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted } from 'vue';
import defaultBg0 from "../../../public/slider/default-slider-bg-0.png";
import defaultBg1 from "../../../public/slider/default-slider-bg-1.png";
import defaultBg2 from "../../../public/slider/default-slider-bg-2.png";
import defaultBg3 from "../../../public/slider/default-slider-bg-3.png";
import defaultBg4 from "../../../public/slider/default-slider-bg-4.png";
import defaultBg5 from "../../../public/slider/default-slider-bg-5.png";

export default {
    name: "as-simple-slider",
    setup() {
        onMounted(() => {

        });

        const bgArray = [defaultBg0, defaultBg1, defaultBg2, defaultBg3, defaultBg4, defaultBg5];
        return {
            bgArray,
        };
    },
}
</script>
<style lang="stylus" scoped>
@import "https://at.alicdn.com/t/font_2825629_0vcm3kudhnta.css?spm=a313x.7781069.1998910419.65&file=font_2825629_0vcm3kudhnta.css"

.simple-wrap
    border 1px solid #eee
    box-shadow 4px 4px 6px #eee
    padding 5px
    font-size 16px
    width (300 / 16)em
    .img-area
        width 100%
        height (150 / 16)em
        background-size cover
        margin-bottom (10 / 16)em
    .slider-area
        width 100%
        height (35 / 16)em
        background-image linear-gradient(to right, #a0cfff, #a0cfff 0%, #ddd 0%, #ddd)
        position relative
        text-align center
        line-height (35 / 16)em
        .slider-btn
            height calc(2.1875em - 2px)
            width (45 / 16)em
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
            &:hover, &:active
                background-color #53a8ff
                border-color #409eff
                cursor pointer
                i
                    color #fff
        span
            font-size (12 / 16)em
            color #fff
            user-select none
</style>

