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
    <as-button prefix-icon="icon-shibai1">
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian">
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button>
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="primary">
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="positive">
        成功按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="warning">
        警告按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="negative">
        错误按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle>
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle suffix-icon="icon-zuobian" prefix-icon="icon-zuobian">
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle prefix-icon="icon-zuobian" type="primary">
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle prefix-icon="icon-zuobian" type="positive">
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle prefix-icon="icon-zuobian" type="warning">
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle prefix-icon="icon-zuobian" type="negative">
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="primary" plain>
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="positive" plain>
        成功按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="warning" plain>
        警告按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="negative" plain>
        错误按钮
    </as-button>
    <br><br>
    <as-button suffix-icon="icon-zuobian" type="primary" disabled>
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="positive" disabled>
        成功按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="warning" plain disabled>
        警告按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="negative" disabled>
        错误按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button suffix-icon="icon-zuobian" type="primary" loading>
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="primary" loading plain>
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" loading circle>
        主要按钮
    </as-button>
    <br><br>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" size="mini">
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" prefix-icon="icon-zuobian" size="mini">
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" prefix-icon="icon-zuobian" size="small">
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" prefix-icon="icon-zuobian" size="normal">
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" prefix-icon="icon-zuobian" size="mini" circle>
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" prefix-icon="icon-zuobian" size="small" circle>
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" prefix-icon="icon-zuobian" size="normal" circle>
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" prefix-icon="icon-zuobian" size="normal" circle plain>
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" prefix-icon="icon-zuobian" round>
        主要按钮
    </as-button>
    <hr>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
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
