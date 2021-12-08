<template>
    <button class="as-button-wrap" ref="buttonRef">
        <loading class="loading-icon" v-if="$props.loading" />
        <component :is="prefixComponent" v-if="!loading && prefixComponent" />
        <span class="as-btn-text" ref="textRef">
            <slot></slot>
        </span>
        <component :is="suffixComponent" v-if="!loading && suffixComponent" />
    </button>
</template>
<script lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import {changeTheme} from "./theme.js";
import * as iconComponentMap from "../../AsIcons/index";

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
        prefixIcon: String,
        suffixIcon: String,
    },
    setup(props) {
        let buttonRef = ref();
        let textRef = ref();

        onMounted(() => {
            // 替换主题
            changeTheme(buttonRef, props);
            // 为文字加margin
            if (textRef.value.innerHTML === "") {
                textRef.value.remove();
            } else {
                textRef.value.innerText = textRef.value.innerText.trim();
            }
            // 设置按钮禁用
            buttonRef.value.disabled = props.loading || props.disabled;
        });

        // 监听禁用
        watch(() => [props.disabled, props.loading], ([newDis, newLoad], [oldDis, oldLoad]) => {
            buttonRef.value.disabled = props.loading || props.disabled;
            // 替换主题
            changeTheme(buttonRef, props);
        });

        return {
            buttonRef,
            textRef,
            prefixComponent: computed(() => {
                return props.prefixIcon && iconComponentMap[props.prefixIcon];
            }),
            suffixComponent: computed(() => {
                return props.suffixIcon && iconComponentMap[props.suffixIcon];
            }),
        };
    },
}
</script>
