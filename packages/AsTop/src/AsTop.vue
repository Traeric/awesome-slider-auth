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
import { ref } from 'vue';
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

document.onscroll = e => {
    let scrollObj = document.documentElement || document.body;
    visible.value = scrollObj.scrollTop >= props.visibilityHeight;
}

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
