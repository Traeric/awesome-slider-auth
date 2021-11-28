<template>
    <div class="as-top" :style="{bottom: bottom + 'px', right: right + 'px'}" v-show="visible"
    @click="backToTop">
        <slot>
            <div class="default">
                <i class="iconfont icon-bxs-to-top"></i>
            </div>
        </slot>
    </div>
</template>
<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
let props = defineProps({
    bottom: {
        type: Number,
        default: 50
    },
    right: {
        type: Number,
        default: 50
    },
    visibilityHeight: {
        type: Number,
        default: 200
    }
});

let visible = ref(false);

onMounted(() => {
    document.onscroll = e => {
        let scrollObj = document.documentElement || document.body;
        visible.value = scrollObj.scrollTop >= props.visibilityHeight;
    }
});

function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
</script>
<script lang="ts">
export default {
    name: "as-top"
}
</script>
<style lang="stylus" scoped>
.as-top
    position fixed
    height 40px
    width 40px
    overflow hidden
    display flex
    justify-content center
    align-items center
    .default
        cursor pointer
        height 100%
        width 100%
        border-radius 50%
        background-color rgba(0, 0, 0, .3)
        display flex
        justify-content center
        align-items center
        color #fff
        &:hover
            background-color rgba(0, 0, 0, .5)
        i
            font-size 20px
</style>
