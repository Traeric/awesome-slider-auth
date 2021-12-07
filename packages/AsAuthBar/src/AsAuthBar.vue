<template>
    <div class="click-btn">
        <auth v-if="!authObj.iconSuccess" />
        <auth-success v-else />
        <span>{{authObj.text}}</span>
        <div class="auth-area">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";

let authObj = reactive({
    text: "立即开启验证",
    iconSuccess: false
});

function success() {
    authObj.text = "认证成功";
    authObj.iconSuccess = true;
}

defineExpose({
    success,
});
</script>
<script lang="ts">
export default {
    name: "as-auth-bar",
}
</script>
