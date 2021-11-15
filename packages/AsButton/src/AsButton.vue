<template>
    <button class="as-button-wrap" ref="buttonRef">
        <i class="iconfont icon-jiazaizhong4 load-icon" v-if="loadIcon"></i>
        <i :class="['as-prefix iconfont', prefixIcon !== null ? prefixIcon : '']"
        v-if="prefixIcon !== null" ref="prefixIconRef"></i>
        <span class="as-text" ref="buttonTextRef">
            <slot></slot>
        </span>
        <i :class="['as-suffix iconfont', suffixIcon !== null ? suffixIcon : '']"
        v-if="suffixIcon !== null" ref="suffixIconRef"></i>
        <i class="iconfont icon-Star" v-if="defaultIcon"></i>
        <i></i>
    </button>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue';
import {changeTheme} from "./theme.js";

export default {
    name: "as-button",
    props: {
        prefixIcon: {
            type: String,
            default: null,
        },
        suffixIcon: {
            type: String,
            default: null,
        },
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
        let buttonTextRef = ref();
        let prefixIconRef = ref();
        let defaultIcon = ref(false);
        let loadIcon = ref(false);
        let suffixIconRef = ref();

        onMounted(() => {
            // 替换主题
            if (props.circle) {
                // 如果是圆角的按钮不允许有文字
                buttonTextRef.value.remove();
                if (props.prefixIcon === null && props.suffixIcon === null) {
                    defaultIcon.value = true;
                }
                if (props.prefixIcon !== null && props.suffixIcon !== null) {
                    suffixIconRef.value.remove();
                }
            }
            // 如果设置了加载 需要将前置的图标去掉 改为加载图标
            if (props.loading) {
                if (prefixIconRef.value !== null && prefixIconRef.value !== undefined) {
                    prefixIconRef.value.remove();
                }
                if (suffixIconRef.value !== null && suffixIconRef.value !== undefined) {
                    suffixIconRef.value.remove();
                }
                defaultIcon.value = false;
                loadIcon.value = true;
            }
            // 如果有文字时需要将文字与按钮隔开
            if (buttonTextRef.value.innerText !== "") {
                buttonTextRef.value.style.padding = "0 3px";
            }
            changeTheme(buttonRef, props);
        });

        return {
            buttonRef,
            buttonTextRef,
            prefixIconRef,
            suffixIconRef,
            defaultIcon,
            loadIcon,
        };
    },
}
</script>
