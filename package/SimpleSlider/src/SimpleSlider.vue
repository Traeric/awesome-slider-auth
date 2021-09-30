<template>
    <div class="simple-wrap">
        <div class="img-area" :style="'background-image: url(' + bgArray[0] + ')'"></div>
        <div class="slider-area">
            <div class="slider-btn"></div>
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
import "//at.alicdn.com/t/font_2844616_bsz28xp9t65.css";

.simple-wrap
    border 1px solid #eee
    box-shadow 4px 4px 6px #eee
    padding 5px
    width 300px
    .img-area
        width 100%
        height 150px
        background-size cover
        margin-bottom 10px
    .slider-area
        width 100%
        height 35px
        background-image linear-gradient(to right, #a0cfff, #a0cfff 0%, #ddd 0%, #ddd)
        position relative
        .slider-btn
            height 33px
            width 45px
            background-color #fff
            border 1px solid #eee
            position absolute
            top 0
            left 0
</style>

