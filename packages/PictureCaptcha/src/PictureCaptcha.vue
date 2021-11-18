<template>
    <div class="as-picture-captcha-wrap" ref="wrapRef">
        <canvas class="picture" ref="pictureRef">

        </canvas>
        <div class="refresh" @click="refresh">
            看不清楚？换张图片
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import {CaptchaHandler} from "./PictureCaptcha";

const wrapRef = ref();
const pictureRef = ref();
let handler: CaptchaHandler;
onMounted(() => {
    // 设置图片区域高度
    pictureRef.value.height = wrapRef.value.offsetWidth * .45;
    pictureRef.value.width = wrapRef.value.offsetWidth;

    handler = new CaptchaHandler(pictureRef.value);
    handler.initPicture();
});

function refresh() {
    handler.initPicture();
}

function auth(input: string|number) {
    return handler.auth(input);
}

defineExpose({
    auth,
    refresh,
});
</script>
<script lang="ts">
export default {
    name: "as-picture-captcha"
}
</script>
