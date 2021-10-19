<template>
    <as-default-slider
    :success="success" width="450" height="250" tips="提示。。。。。" errorRange="10"
    :refresh="refresh" />

    <hr>

    <as-default-slider
    :success="success" />

    <hr>

    <as-simple-slider :success="success1" :autoClose="false" tips="向右滑动滑块，完成认证" :errorRange="10" size="normal" 
    background="https://cn.bing.com/th?id=OHR.FanalMadeira_ZH-CN5337723033_1920x1080.jpg&rf=LaDigue_1920x1080.jpg" />

    <hr>
</template>

<script>
export default {
    name: 'App',
    setup() {
        function success() {
            console.log("回调成功");
        }

        function refresh(callback) {
            setTimeout(() => {
                callback({
                    "puzzleX": 1000,
                    "puzzleY": 50,
                    "backgroundPath": "https://cn.bing.com/th?id=OHR.MidAutumnFestival2021_ZH-CN7657484762_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
                });
            }, 500);
        }


        function success1(close) {
            alert(1);
            setTimeout(() => {
                close();
            }, 1000);
        }

        return {
            success,
            refresh,
            success1,
        };
    }
}
</script>
