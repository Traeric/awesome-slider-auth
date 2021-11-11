<template>
    <div class="as-code-block-wrap" ref="codeBlockWrapRef">
        <div class="code-area" ref="codeAreaRef">
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue';
import "../style/AsCodeBlock.styl";
import {CodeBlockHandler, ThemeHandler} from './AsCodeBlock';
import type {themeType} from "./AsCodeBlock.typing";

const props = defineProps({
    code: {
        type: String,
        default: ''
    },
    theme: {
        type: String as PropType<themeType>,
        default: "light"
    }
});

const codeAreaRef = ref();
const codeBlockWrapRef = ref();
onMounted(() => {
    // 格式化要展示的代码
    const handler = new CodeBlockHandler(props.code);
    codeAreaRef.value.innerHTML = handler.parseCode();
    // 切换主题
    new ThemeHandler(codeBlockWrapRef.value).changeTheme(props.theme);
});

</script>
<script lang="ts">
export default {
    name: "as-code-block"
}
</script>

