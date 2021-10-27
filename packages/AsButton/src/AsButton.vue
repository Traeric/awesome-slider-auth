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
<script>
import { onMounted, ref } from 'vue';
import {changeTheme} from "./theme.js";

export default {
    name: "as-button",
    props: {
        "prefix-icon": {
            type: String,
            default: null,
        },
        "suffix-icon": {
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
        let buttonRef = ref(null);
        let buttonTextRef = ref(null);
        let prefixIconRef = ref(null);
        let defaultIcon = ref(false);
        let loadIcon = ref(false);
        let suffixIconRef = ref(null);

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
<style lang="stylus" scoped>
@import "../../Style/animation.styl"
.as-button-wrap
    --backend-color #fff
    --font-color #000
    --border-color #000
    --border-radius 4px
    --hover-backend-color #eee
    --padding 10px 18px
    --hover-font-color #000
    --hover-border-color #000
    --disabled pointer
    --opacity 1

    padding var(--padding)
    background none
    border 1px solid #000
    border-radius var(--border-radius)
    color var(--font-color)
    border-color var(--border-color)
    background-color var(--backend-color)
    line-height 1
    font-weight 500
    cursor var(--disabled)
    opacity var(--opacity)
    &:hover
        background-color var(--hover-backend-color)
        color var(--hover-font-color)
        border-color var(--hover-border-color)
        opacity var(--opacity)
    i
        font-size 14px
        vertical-align bottom
    .load-icon
        display inline-block
        animation rotate 1s linear infinite
</style>
