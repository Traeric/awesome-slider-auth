<template>
    <as-default-slider background-path="src/assets/default-slider-bg.png" :success="success" />
</template>

<script>
export default {
    name: 'App',
    components: {
    },
    setup() {
        function success() {
            console.log("回调成功");
        }

        return {
            success,
        };
    }
}
</script>
