<template>
    <div class="click-btn">
        <i :class="['iconfont', authObj.icon]"></i>
        <span>{{authObj.text}}</span>
        <div class="auth-area">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import "../style/AuthBar.styl";

let authObj = reactive({
    text: "立即开启验证",
    icon: "icon-renzhengguanli"
});

function success() {
    authObj.text = "认证成功";
    authObj.icon = "icon-icon1";
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