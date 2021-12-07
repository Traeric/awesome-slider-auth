<template>
    <button class="as-button-wrap" ref="buttonRef">
        <loading class="loading-icon" v-if="$props.loading" />
        <slot></slot>
    </button>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue';
import {changeTheme} from "./theme.js";

export default {
    name: "as-button",
    props: {
        type: {
            type: String,
            default: "default",
        },
        // 是否圆角
        circle: Boolean,
        // 背景是否透明
        plain: Boolean,
        // 是否禁用
        disabled: Boolean,
        // 是否加载
        loading: Boolean,
        // 设置圆角
        round: Boolean,
        size: {
            type: String,
            default: "normal"
        },
    },
    setup(props) {
        let buttonRef = ref();
        let loadIcon = ref(false);

        onMounted(() => {
            // 替换主题
            changeTheme(buttonRef, props);
        });

        return {
            buttonRef,
            loadIcon,
        };
    },
}
</script>
