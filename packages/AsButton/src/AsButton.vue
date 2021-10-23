<template>
    <button class="as-button-wrap" ref="buttonRef">
        <i :class="['as-prefix iconfont', prefixIcon !== null ? prefixIcon : '']"
        v-if="prefixIcon !== null"></i>
        <span class="as-text" ref="buttonTextRef">
            <slot></slot>
        </span>
        <i :class="['as-suffix iconfont', suffixIcon !== null ? suffixIcon : '']"
        v-if="suffixIcon !== null"></i>
        <i class="iconfont icon-Star" v-if="defaultIcon"></i>
    </button>
</template>
<script>
import { onMounted, ref } from '@vue/runtime-core';
import {changeTheme} from "../../abstract/theme.js";

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
        circle: Boolean,
    },
    setup(props) {
        let buttonRef = ref(null);
        let buttonTextRef = ref(null);
        let defaultIcon = ref(false);

        onMounted(() => {
            // 替换主题
            let themeType = props.type;
            if (props.circle) {
                // 如果是圆角的按钮不允许有文字
                buttonTextRef.value.remove();
                themeType += "Circle";
                if (props.prefixIcon === null && props.suffixIcon === null) {
                    defaultIcon.value = true;
                }
            }
            changeTheme(buttonRef, themeType);
        });

        return {
            buttonRef,
            buttonTextRef,
            defaultIcon,
        };
    },
}
</script>
<style lang="stylus" scoped>
.as-button-wrap
    --backend-color #fff
    --font-color #000
    --border-color #000
    --border-radius 4px
    --hover-color #eee
    --padding 10px 18px

    padding var(--padding)
    cursor pointer
    background none
    border 1px solid #000
    border-radius var(--border-radius)
    color var(--font-color)
    border-color var(--border-color)
    background-color var(--backend-color)
    line-height 1
    &:hover
        background-color var(--hover-color)
    i
        font-size 14px
        overflow hidden
</style>
