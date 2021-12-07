<template>
    <br><br><br><br><br><br><br><br><br><br><br>
    <as-default-slider
    :success="success" width="450" height="250" tips="提示。。。。。" errorRange="10"
    :refresh="refresh" />

    <hr>

    <as-default-slider
    :success="success" />

    <hr>

    <div style="width: 300px;">
        <as-auth-bar ref="authRef">
            <as-simple-slider :success="success1" :autoClose="false" tips="向右滑动滑块，完成认证" :errorRange="10" size="normal" 
            background="https://cn.bing.com/th?id=OHR.FanalMadeira_ZH-CN5337723033_1920x1080.jpg&rf=LaDigue_1920x1080.jpg" />
        </as-auth-bar>
    </div>
    <hr>
    <as-button prefix-icon="icon-shibai1">
        <search />
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button>
        测试按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button>
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="primary">
        <search />
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="positive">
        成功按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="warning">
        警告按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative">
        错误按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle>
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle>
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle type="primary">
        <search />
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle type="positive">
        <search />
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle type="warning">
        <search />
        测试按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button circle type="negative">
        <search />
        测试按钮
    </as-button>
    <br><br>
    <as-button type="primary" plain>
        主要按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="positive" plain>
        成功按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="warning" plain>
        警告按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" plain>
        错误按钮
        <search />
    </as-button>
    <br><br>
    <as-button type="primary" disabled>
        主要按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="positive" disabled>
        成功按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="warning" plain disabled>
        警告按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" disabled>
        错误按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="primary" loading>
        主要按钮
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="primary" loading plain>
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" loading circle>
    </as-button>
    <br><br>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" size="mini">
        <search />
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" size="mini">
        <search />
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" size="small">
        <search />
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" size="normal">
        <search />
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" size="mini" circle>
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" size="small" circle>
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" size="normal" circle>
        <search />
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" size="normal" circle plain>
        <search />
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative" round>
        <search />
        主要按钮
    </as-button>
    &nbsp;&nbsp;&nbsp;
    <as-button type="negative">
        <loading />
    </as-button>
    <hr>
    <p>{{t}}</p>
    <hr>
    <div style="width: 500px;">
        <as-puzzle-slider :success="success" tips="提示提示提示" :errorRange="10" 
        :refreshFrequency="5" 
        :refresh="refresh" />
    </div>
    <div style="width: 300px;">
        <as-auth-bar>
            <as-puzzle-slider :success="success" tips="提示提示提示" :errorRange="10" 
            :refreshFrequency="5" 
            :refresh="refresh" />
        </as-auth-bar>
    </div>
    <hr>
    <div style="width: 300px;">
        <as-text-slider :success="success" />
    </div>
    <br><br><br><br><br>
    <div style="width: 300px;">
        <as-text-slider :refresh="refreshText" />
    </div>
    <br>
    <as-button type="primary" @click="messageDialog">消息提示VNode</as-button> 
    <as-button type="positive" @click="messageDialog1">消息提示</as-button> 
    <as-button type="warning" @click="messageDialog2">消息提示2</as-button>
    <as-button type="negative" @click="messageDialog3">消息提示3</as-button>
    <br><br>
    <div style="width: 500px;">
        <as-code-block theme="light" ref="codeBlockRef"></as-code-block>
    </div>
    <br><br>
    <div style="width: 350px">
        <as-auth-bar>
            <as-rotate-slider :success="success"></as-rotate-slider>
        </as-auth-bar>
    </div>
    <br><br>
    <div style="width: 350px">
        <as-rotate-slider></as-rotate-slider>
    </div>
    <br><br><br>
    <div style="width: 120px; height: 50px;">
        <as-picture-captcha ref="pictureCaptchaRef"></as-picture-captcha>
        <input type="text" v-model="a">
        <as-button @click="pictureAuth" type="primary">认证</as-button>
    </div>
    <br><br><br><br><br><br>
    <div style="width: 300px;">
        <as-jigsaw-slider :refresh="jigsawRefresh" :success="jigsawSuccess" />
    </div>
    <br>
    <as-top />
    <as-top :bottom="100" :visibility-height="10">
        <div
            style="
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
            "
        >
            UP
        </div>
    </as-top>
    <br><br>
    <div style="width: 350px">
        <as-scratch-slider :refresh="jigsawRefresh" :success="jigsawSuccess" />
    </div>
    <br><br>
    <arrow />
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</template>

<script setup>
import { h, onMounted, ref } from "vue";
import {AsMessage} from "../packages";

const pictureCaptchaRef = ref();
let a = ref();
let authCount = 0;
let authRef = ref();

function jigsawRefresh(callback) {
    let bgArr = ['https://cn.bing.com/th?id=OHR.BeechTrees_ZH-CN9605292244_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://cn.bing.com/th?id=OHR.ElanValley_ZH-CN9533069637_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://cn.bing.com/th?id=OHR.WinterWaxwing_ZH-CN9435499385_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://cn.bing.com/th?id=OHR.SquirrelsCairngorms_ZH-CN9369511507_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://cn.bing.com/th?id=OHR.ChocoHillBohol_ZH-CN9297094265_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://cn.bing.com/th?id=OHR.AmmoniteShell_ZH-CN9232274077_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://cn.bing.com/th?id=OHR.IrohazakaRoad_ZH-CN9151363864_1920x1080.jpg&rf=LaDigue_1920x1080.jpg'];
    let index = Math.floor(Math.random() * bgArr.length);
    let bg = bgArr[index];
    callback({
        "background": bg
    });
}

function jigsawSuccess() {
    AsMessage({
        message: "认证成功！！！",
        type: "success"
    });
}

function refreshPicture() {
    return {
        "text": "4r4r",
        "result": "dfdf",
        "color": "#f00"
    };
}

function pictureAuth() {
    if (pictureCaptchaRef.value.auth(a.value)) {
        AsMessage({
            message: "认证成功",
            type: "success"
        });
    } else {
        AsMessage({
            message: "认证失败",
            type: "error"
        });
        // if (++authCount >= 5) {
            pictureCaptchaRef.value.refresh();
            authCount = 0;
        // }
    }
}


let code = 
`<template>
    <as-button type="warning" @click="messageTip">Message消息基础用法</as-button>
    <as-button type="negative" @click="messageVNode">VNode消息基础用法</as-button>
</template>
<script setup>
    import {AsMessage} from "awesome-slider-auth";
    import { h } from "vue";
    
    function messageTip() {
        AsMessage({
            message: "Message提示基础用法",
            elementLike: true
        });
    }

    function messageVNode() {
        AsMessage({
            message: h('p', null, [
                h('span', null, 'Message消息支持 '),
                h('i', { style: 'color: teal' }, 'VNode'),
            ]),
            elementLike: true
        });
    }
<\/script>`;

const codeBlockRef = ref();
onMounted(() => {
    codeBlockRef.value.formatCode(code);
});

function messageDialog() {
    AsMessage({
        message: h('p', null, [
          h('span', null, 'Message can be '),
          h('i', { style: 'color: teal' }, 'VNode'),
        ]),
        type: "info",
        onClose: () => {
            console.log(111);
        },
        offset: 20,
        duration: 1000,
        // elementLike: true,
    });
}

function messageDialog1() {
    AsMessage({
        message: 'This is a test message',
        type: "success",
        onClose: () => {
            console.log(111);
        },
        offset: 20,
        duration: 1000,
        elementLike: true,
    });
}

function messageDialog2() {
    AsMessage({
        message: 'This is a test message',
        type: "warn",
        onClose: () => {
            console.log(111);
        },
        offset: 20,
        duration: 1000,
    });
}

function messageDialog3() {
    AsMessage({
        message: 'This is a test message',
        type: "error",
        onClose: () => {
            console.log(111);
        },
        offset: 20,
        duration: 1000,
    });
}

function success() {
    AsMessage("回调成功");
}

function refresh(callback) {
    setTimeout(() => {
        let position = {
            "x": 1000,
            "y": 50,
            "background": "https://www.bing.com/th?id=OHR.CinnamonFernNS_ZH-CN3822051382_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
        };
        callback(position);
    }, 1000);
}


function success1() {
    AsMessage("认证成功");
    authRef.value.success();
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
        return;
        }
}

function refreshText(callback) {
    callback({
        background: "https://www.bing.com/th?id=OHR.MackArch_ZH-CN1068755647_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
    });
}
</script>
