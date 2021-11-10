<template>
    <div class="as-code-block-wrap">
        <div class="code-area" ref="codeAreaRef">
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import "../style/AsCodeBlock.styl";
import AsCodeBlockHandler from './AsCodeBlock';

const props = defineProps({
    code: {
        type: String,
        default: ''
    }
});

const codeAreaRef = ref();
onMounted(() => {
    // 获取要展示的代码
    const handler = new AsCodeBlockHandler(props.code);
    codeAreaRef.value.innerHTML = handler.parseCode();
});

</script>
<script lang="ts">
export default {
    name: "as-code-block"
}
</script>

