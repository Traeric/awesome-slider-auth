<template>
    <div class="as-top" :style="{bottom: bottom + 'px', right: right + 'px'}" v-show="visible"
    @click="backToTop">
        <slot>
            <div class="default">
                <top class="icon-top" />
            </div>
        </slot>
    </div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, PropType, Ref, ref } from 'vue';
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
    },
    listenElement: {
        type: Object as PropType<HTMLElement | Document>,
        default: document
    }
});

let visible = ref(false);

nextTick(() => {
    if (props.listenElement) {
        props.listenElement.addEventListener("scroll", () => {
            let domElement: HTMLElement;
            if (props.listenElement instanceof Document) {
                domElement = props.listenElement.documentElement;
            } else {
                domElement = props.listenElement;
            }
            visible.value = domElement.scrollTop >= props.visibilityHeight;
        }, false);
    }
});

function backToTop() {
    let domElement: HTMLElement;
    if (props.listenElement instanceof Document) {
        domElement = props.listenElement.documentElement;
    } else {
        domElement = props.listenElement;
    }
    domElement.scrollTo({
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
