<template>
    <div class="jigsaw-slider-wrap">
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
        </div>
        <div class="asa-slider-bar jigsaw-slider-bar">
            <span class="text">验证：请</span>
            <span class="tips">拖动区块</span>
            <span class="text">得到完整的图片</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { defaultBackground1 } from "../../utils/pictureAdapter.js";
import JigsawHandler from "./JigsawSlider";

const bgRef = ref();
let jigsawHandler: JigsawHandler;

onMounted(() => {
    // 设置背景大小
    bgRef.value.style.height = `${bgRef.value.offsetWidth * .5}px`;

    // 设置背景 TODO 暂时
    let blocks = bgRef.value.querySelectorAll(".block");
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.height = `${bgRef.value.offsetHeight * 0.5 - 2}px`;
        blocks[i].style.width = `${bgRef.value.offsetWidth * 0.5 - 2}px`;
    }
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
    jigsawHandler.initPanel(defaultBackground1);
});
</script>
<script lang="ts">
export default {
    name: "as-jigsaw-slider"
}
</script>
<style lang="stylus" scoped>
.jigsaw-slider-wrap
    .bg
        border-radius 5px
        background-color #fff
        margin-bottom 10px
        overflow hidden
        --back-offset 4px
        --offset-width 175px
        --offset-height 87.5px
        .wrap
            position relative
            height 100%
            width 100%
            .block
                position absolute
                z-index 100
                cursor move
                background-size calc(var(--offset-width) * 2) calc(var(--offset-height) * 2)
                .position
                    position relative
                    height 100%
                    width 100%
                    &:hover::after
                        content ""
                        display block
                        position absolute
                        height 100%
                        width 100%
                        top 0
                        left 0
                        background-color rgba(255, 255, 255, .3)
                        z-index 98
                    .serial
                        position absolute 
                        top 5px
                        left 5px
                        height 15px
                        line-height 15px
                        text-align center
                        width 15px
                        font-size 12px
                        background-color rgba(0, 0, 0, .5)
                        color rgba(255, 255, 255, .5)
                        border 1px solid rgba(255, 255, 255, .5)
                        border-radius 50%
                        z-index 99
                        user-select none
            .left-top
                top 0
                left 0
            .right-top
                right 0
                top 0
                background-position var(--offset-width) 0
            .left-bottom
                left 0
                bottom 0
                background-position 0 var(--offset-height)
            .right-bottom
                right 0
                bottom 0
                background-position var(--offset-width) var(--offset-height)
            .back
                position absolute
                z-index 99
                border-radius 5px
                border 1px dotted #aaa
            .back-left-top
                top var(--back-offset)
                left var(--back-offset)
            .back-right-top
                right var(--back-offset)
                top var(--back-offset)
            .back-left-bottom
                left var(--back-offset)
                bottom var(--back-offset)
            .back-right-bottom
                right var(--back-offset)
                bottom var(--back-offset)
    .jigsaw-slider-bar
        text-align left
        padding 0 10px
</style>

