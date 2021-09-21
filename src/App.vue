<template>
    <as-default-slider
    :success="success" width="450" height="250" tips="提示。。。。。" errorRange="10"
    :refresh="refresh" />

    <as-default-slider
    :success="success" />
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

        function refresh(callback) {
            setTimeout(() => {
                callback({
                    "puzzleX": 180,
                    "puzzleY": 50,
                    "backgroundPath": "https://cn.bing.com/th?id=OHR.MidAutumnFestival2021_ZH-CN7657484762_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
                });
            }, 500);
        }

        return {
            success,
            refresh,
        };
    }
}
</script>
