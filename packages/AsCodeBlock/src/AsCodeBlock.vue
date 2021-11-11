<template>
    <div class="as-code-block-wrap" ref="codeBlockWrapRef">
        <div class="as-code-block-code-area" ref="codeAreaRef">
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue';
import "../style/AsCodeBlock.styl";
import {CodeBlockHandler, ThemeHandler} from './AsCodeBlock';
import type {themeType} from "./AsCodeBlock.typing";

const props = defineProps({
    theme: {
        type: String as PropType<themeType>,
        default: "light"
    }
});

const codeAreaRef = ref();
const codeBlockWrapRef = ref();
onMounted(() => {
    // 切换主题
    new ThemeHandler(codeBlockWrapRef.value).changeTheme(props.theme);
});

function formatCode(code: string) {
    // 格式化要展示的代码
    const handler = new CodeBlockHandler(code);
    codeAreaRef.value.innerHTML = handler.parseCode();
}

defineExpose({
    formatCode,
});

</script>
<script lang="ts">
export default {
    name: "as-code-block"
}
</script>

