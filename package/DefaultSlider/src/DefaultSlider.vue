<template>
    <div id="awesome_slider_default" ref="sliderWrap">
        <div class="image-area" ref="imageWrap">
            
        </div>
        <div class="silder-area">
            <div class="slider"></div>
        </div>
    </div>
</template>

<script>
import {ref, onMounted} from "vue";

export default {
    name: 'as-default-slider',
    props: {
        "background-path": {
            type: String,
            default: "../../public/slider/default-slider-bg.png"
        },
        width: {
            type: Number,
            default: 450
        },
        height: {
            type: Number,
            default: 250
        }
    },
    setup(props) {
        const imageWrap = ref(null);
        const sliderWrap = ref(null);

        onMounted(() => {
            // 设置slider背景
            imageWrap.value.style.cssText = `
                background-image: url(${props.backgroundPath});
                height: ${props.height}px;
                width: ${props.width}px;
                background-size: ${props.width}px ${props.height}px;
                background-repeat: no-repeat;
            `;

            sliderWrap.value.style.cssText = `
                width: ${props.width}px;
            `;
        });
        
        return {
            imageWrap,
            sliderWrap,
        };
    }
}
</script>

<style scoped lang="stylus">
#awesome_slider_default
    border 1px solid #eee
    box-shadow 4px 4px 6px #eee
    padding 5px
    .image-area
        margin-bottom 10px
    .silder-area
        height 35px
        width calc(100% - 2px)
        display flex
        border 1px solid #eee
        .slider
            width 45px
            height 100%
            border-style solid 
            border-color #eee
            border-width 0 1px 0 1px
            cursor pointer
            background-image url('../../../public/slider/default-slider-arrow.png')
            background-size 29px 29px
            background-repeat no-repeat
            background-position 8px 3px
            &:hover
                background-color rgb(83, 168, 255)
                border-color #409EFF
                background-image url('../../../public/slider/default-slider-arrow-select.png')
</style>
