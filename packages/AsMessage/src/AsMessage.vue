<template>
    <transition
        name="as-message-fade"
        @before-leave="props.onClose"
        @after-leave="$emit('destory')">
        <div class="as-message-wrap"
        v-show="messageShow"
        :style="styles"
        :class="wrapClass">
        <component :class="iconClass" :is="iconComponent" />
        <span>
            <VNode :content="message"></VNode>
        </span>
        </div>
    </transition>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, PropType, ref } from "vue";
import { MessageType } from "./AsMessageOptions.types";
import {VNode} from "../../utils/insertVNode";
import { infoMessage, errorMessage, successMessage, warningMessage } from '../../AsIcons';

let props = defineProps({
    offset: Number,
    message: {
        type: Object,
        default: ''
    },
    onClose: Function as PropType<() => void>,
    id: String,
    type: {
        type: String as PropType<MessageType>,
        default: "info"
    },
    duration: {
        type: Number,
        default: 3000
    },
    elementLike: {
        type: Boolean,
        default: false
    }
});

const MessageIconMap = {
    "success": successMessage,
    "error": errorMessage,
    "warn": warningMessage,
    "info": infoMessage,
}

let messageShow = ref(false);

let timer;
onMounted(() => {
    messageShow.value = true;

    timer = setTimeout(() => {
        messageShow.value = false;
    }, props.duration);
});

onUnmounted(() => {
    clearTimeout(timer);
});

let styles = computed(() => ({
    top: `${props.offset}px`
}));

let iconComponent = computed(() => {
    return MessageIconMap[props.type];
});

let iconClass = computed(() => [
    'message-icon',
    'icon-' + props.type,
]);

let wrapClass = computed(() => {
    let cls: string[] = [];
    if (props.elementLike) {
        cls.push('as-message-' + props.type);   
    } else {
        cls.push('');
    }
    return cls;
});
</script>

