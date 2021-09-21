<template>
    <div id="awesome_slider_default" ref="sliderWrap">
        <div class="image-area" ref="imageWrap">
            <canvas class="cover" ref="coverPuzzle" 
            @mousedown="sliderDownEvent" width="72" height="72"
            v-show="sliderObj.puzzleShow"></canvas>
            <canvas class="fill" height="72" width="72" ref="fillPuzzle" v-show="sliderObj.puzzleShow"></canvas>
            <img :src="bgArray[0]" alt="NO IMG" ref="bgImg">
            <div class="load" v-show="sliderObj.loadShow">
                <img :src="load" alt="NO IMG">
            </div>
            <div class="refresh" @click="refreshImg" 
            :style="'background-image: url(' + refreshImage + ')'"
            @mouseover="refreshBtnMouseOver" 
            @mouseleave="refreshBtnMouseLeave" 
            ref="refreshRef"></div>
        </div>
        <div class="silder-area" ref="sliderBar">
            <span>{{ tips }}</span>
            <div class="slider" 
            @mousedown="sliderDownEvent" 
            ref="slider"
            :style="'background-image: url(' + arrow + ')'" 
            @mouseover="sliderMouseOver" 
            @mouseleave="sliderMouseLeave"></div>
        </div>
    </div>
</template>

<script>
import {ref, onMounted, reactive} from "vue";
import defaultBg0 from "../../../public/slider/default-slider-bg-0.png";
import defaultBg1 from "../../../public/slider/default-slider-bg-1.png";
import defaultBg2 from "../../../public/slider/default-slider-bg-2.png";
import defaultBg3 from "../../../public/slider/default-slider-bg-3.png";
import defaultBg4 from "../../../public/slider/default-slider-bg-4.png";
import defaultBg5 from "../../../public/slider/default-slider-bg-5.png";
import load from "../../../public/slider/load.png";
import arrow from "../../../public/slider/default-slider-arrow.png";
import arrowSelect from "../../../public/slider/default-slider-arrow-select.png";
import refreshImage from "../../../public/slider/default-slider-refresh.png";
import refreshSelectImg from "../../../public/slider/default-slider-refresh-select.png";
import sliderError from "../../../public/slider/default-slider-error.png";
import sliderOk from "../../../public/slider/default-slider-ok.png";

export default {
    name: 'as-default-slider',
    props: {
        // 图片区域宽度
        width: {
            type: Number,
            default: 300
        },
        // 图片区域高度
        height: {
            type: Number,
            default: 150
        },
        // 移动拼图前的提示
        tips: {
            type: String,
            default: '移动滑块，完成拼图'
        },
        // 刷新图片时的回调函数
        refresh: Function,
        // 验证成功回调方法
        success: Function,
        // 拼图之间允许的误差大小 默认为10像素
        errorRange: {
            type: Number,
            default: 5
        }
    },
    setup(props) {
        const imageWrap = ref(null);
        const sliderWrap = ref(null);
        const slider = ref(null);
        const sliderBar = ref(null);
        const coverPuzzle = ref(null);
        const fillPuzzle = ref(null);
        const bgImg = ref(null);
        const refreshRef = ref(null);

        onMounted(() => {
            // 设置slider背景
            imageWrap.value.style.cssText += `
                height: ${props.height}px;
                width: ${props.width}px;
                background-size: ${props.width}px ${props.height}px;
                background-repeat: no-repeat;
            `;
            // 设置滑块轨道的长度
            sliderWrap.value.style.cssText += `
                width: ${props.width}px;
            `;
        });

        function refreshBtnMouseOver() {
            refreshRef.value.style.cssText += `
                background-image: url(${refreshSelectImg});
            `;
        }

        function refreshBtnMouseLeave() {
            refreshRef.value.style.cssText += `
                background-image: url(${refreshImage});
            `;
        }

        const bgArray = [defaultBg0, defaultBg1, defaultBg2, defaultBg3, defaultBg4, defaultBg5];
        let {puzzleObj, initPuzzlePosition} = drawPuzzleGather(coverPuzzle, props, fillPuzzle, bgImg, imageWrap, bgArray);
        let {sliderDownEvent, sliderObj, refreshImg, sliderMouseOver, sliderMouseLeave} = sliderMoveGather(sliderBar, slider, coverPuzzle, fillPuzzle, puzzleObj, props, initPuzzlePosition);
        
        return {
            imageWrap,
            sliderWrap,
            slider,
            sliderBar,
            coverPuzzle,
            fillPuzzle,
            bgImg,
            puzzleObj,
            sliderDownEvent,
            sliderObj,
            refreshImg,
            refreshBtnMouseOver,
            refreshBtnMouseLeave,
            sliderMouseOver,
            sliderMouseLeave,
            refreshRef,
            // 图片
            load,
            bgArray,
            refreshImage,
            arrow,
            arrowSelect,
        };
    }
}

function sliderMoveGather(sliderBar, slider, coverPuzzle, fillPuzzle, puzzleObj, props, initPuzzlePosition) {
    // 滑块能否被点击
    let sliderObj = reactive({
        mouseDownFlag: true,
        sliderMovePercent: 0,
        puzzleShow: true,
        loadShow: false,
        canRefresh: true,
        // 是否能够通过鼠标移入移出事件修改滑块样式
        sliderEvent: true,
    });

    function sliderDownEvent(e) {
        if (!sliderObj.mouseDownFlag) {
            return;
        }
        // 禁用鼠标事件改变滑块样式的事件
        sliderObj.sliderEvent = false;
        // 获取滑块最大能移动的距离
        const sliderMoveMostLength = sliderBar.value.offsetWidth - slider.value.offsetWidth;
        // 获取鼠标点击时在可视化界面的位置
        const visibleX = e.clientX;
        document.onmousemove = moveEvent => {
            // 获取移动后鼠标距离可视化界面的位置
            const moveVisibleX = moveEvent.clientX;
            // 获取相对点击处移动的距离 该距离就是滑块应该移动的距离
            let sliderMoveLength = moveVisibleX - visibleX;
            // 限制滑块移动距离 不允许小于0 不允许大于 滑块轨道长度 - 滑块长度
            sliderMoveLength = Math.max(0, sliderMoveLength);
            sliderMoveLength = Math.min(sliderMoveMostLength, sliderMoveLength);
            // 移动滑块
            slider.value.style.cssText += `
                left: ${sliderMoveLength}px;
            `;
            // 计算滑块条已经滑动的距离相对于整体的百分比
            sliderObj.sliderMovePercent = sliderMoveLength / sliderBar.value.offsetWidth * 100;
            // 填充滑块已经移动区域的颜色
            sliderBar.value.style.cssText += `
                background: linear-gradient(to right, #a0cfff, #a0cfff ${sliderObj.sliderMovePercent}%, #ddd ${sliderObj.sliderMovePercent}%, #ddd);
            `;
            // 移动拼图
            // 获取拼图和滑块的移动比例 即计算出滑块移动一个单位相当于拼图移动多少个单位  拼图可移动距离 / 滑块可移动距离
            let moveRate = (sliderBar.value.offsetWidth - puzzleObj.puzzleWidth) / (sliderBar.value.offsetWidth - slider.value.offsetWidth);
            coverPuzzle.value.style.cssText += `
                left: ${sliderMoveLength * moveRate}px;
            `;
        }

        document.onmouseup = e => {
            document.onmousemove = null;
            // 暂时将滑块颜色保持为选中样式（防止认证过慢导致样式丢失）
            slider.value.style.cssText += `
                background-color: rgb(83, 168, 255);
                border-color: #409EFF;
                background-image: url(${arrowSelect});
            `;
            // 暂时禁用滑块点击事件 认证完成后放开
            sliderObj.mouseDownFlag = false;
            // 开始验证
            // 获取拼图在图片区域的位置
            const coverPuzzlePositionX = parseInt(coverPuzzle.value.style.left.replace('px', ''));
            const fillPuzzlePositionX = parseInt(fillPuzzle.value.style.left.replace('px', ''));
            // 允许两个拼图之间存在误差
            if (Math.abs(coverPuzzlePositionX - fillPuzzlePositionX) <= props.errorRange) {
                // 认证成功
                sliderBar.value.style.cssText += `
                    background: linear-gradient(to right, #67c23abf, #67c23abf ${sliderObj.sliderMovePercent}%, #ddd ${sliderObj.sliderMovePercent}%, #ddd);
                `;
                slider.value.style.cssText += `
                    background-color: #67C23A;
                    border-color: #61c231;
                    background-image: url(${sliderOk});
                `;
                // 认证成功不允许再点击刷新按钮
                sliderObj.canRefresh = false;
                props.success();
            } else {
                // 认证失败
                sliderBar.value.style.cssText += `
                    background: linear-gradient(to right, #f56c6cd1, #f56c6cd1 ${sliderObj.sliderMovePercent}%, #ddd ${sliderObj.sliderMovePercent}%, #ddd);
                `;
                slider.value.style.cssText += `
                    background-color: #F56C6C;
                    border-color: #f46262;
                    background-image: url(${sliderError});
                `;
                setTimeout(() => {
                    // 错误样式展示后将所有数据归为
                    sliderBar.value.style.cssText += `
                        background: linear-gradient(to right, #a0cfff, #a0cfff 0%, #ddd 0%, #ddd);
                    `;
                    // 这里直接使用等于号覆盖掉之前设置的失败颜色 由于style的优先级高于class 因此清除style中的样式后class的样式会直接生效恢复成默认的样子
                    slider.value.style.cssText = `
                        transition: left .5s;
                        left: 0;
                        background-image: url(${arrow});
                    `;
                    setTimeout(() => {
                        // 清除slider移动效果
                        slider.value.style.cssText = `
                            transition: none;
                            background-image: url(${arrow});
                        `;
                        // 恢复鼠标移入移出能改变滑块样式事件
                        sliderObj.sliderEvent = true;
                    }, 500);
                    // 刷新图片以及拼图位置
                    refreshImg();
                }, 300);
            }
            // 防止重复点击
            document.onmouseup = null;
        }
    }

    function refreshImg() {
        if (!sliderObj.canRefresh) {
            return;
        }
        // 显示图片加载页面
        sliderObj.puzzleShow = false;
        sliderObj.loadShow = true;
        // 请求新的图片
        setTimeout(() => {
            initPuzzlePosition(() => {
                // 设置隐藏加载页面
                sliderObj.puzzleShow = true;
                sliderObj.loadShow = false;
                // 设置允许slider点击事件
                sliderObj.mouseDownFlag = true;
            });
        }, 200);
    }

    function sliderMouseOver() {
        if (!sliderObj.sliderEvent) {
            return;
        }
        slider.value.style.cssText += `
            background-image: url(${arrowSelect});
        `;
    }

    function sliderMouseLeave() {
        if (!sliderObj.sliderEvent) {
            return;
        }
        slider.value.style.cssText += `
            background-image: url(${arrow});
        `;
    }

    return {
        sliderDownEvent,
        sliderObj,
        refreshImg,
        sliderMouseOver,
        sliderMouseLeave
    };
}

function drawPuzzleGather(coverPuzzle, props, fillPuzzle, bgImg, imageWrap, bgArray) {
    let puzzleObj = {
        puzzleWidth: 0,
        fillPuzzlePositionX: 0,
        fillPuzzlePositionY: 0,
        bgIndex: 0,
    };

    let puzzleWidth = 0;
    let r = 0;
    onMounted(() => {
        // 定义拼图宽度（不包含圆圈）以及圆圈半径
        puzzleWidth = 50;
        r = puzzleWidth / 6;
        // 计算并设置拼图整体的大小（包括圆圈）
        puzzleObj.puzzleWidth = puzzleWidth + 2 * r;
        // 绘制拼图
        // 绘制要覆盖的拼图
        const coverCtx = coverPuzzle.value.getContext('2d');
        drawPuzzlePath(coverCtx, puzzleWidth, r);
        coverCtx.clip();
        // 将图片设置到画布上
        // 设置图片信息 用于扣拼图
        bgImg.value.width = props.width;
        bgImg.value.height = props.height;
        // 绘制被填充的拼图
        const fillCtx = fillPuzzle.value.getContext('2d');
        drawPuzzlePath(fillCtx, puzzleWidth, r);
        fillCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        fillCtx.fill();

        // 初始化拼图位置
        initPuzzlePosition(() => {});
    });

    function drawPuzzlePath(ctx, puzzleWidth, r) {
        // 画图时想右移动的距离 方式左边的线条无法显示
        const startX = 5;
        ctx.beginPath();
        ctx.moveTo(0 + startX, 2 * r);
        ctx.lineTo(startX + puzzleWidth / 2 - 10, 2 * r);
        ctx.arc(startX + puzzleWidth / 2, r + 1, r, 0.68 * Math.PI, 2.29 * Math.PI);
        ctx.lineTo(startX + puzzleWidth, 2 * r);
        ctx.lineTo(startX + puzzleWidth, puzzleWidth / 2 + 2 * r - 6);
        ctx.arc(startX + puzzleWidth + r - 2, puzzleWidth / 2 + 2 * r, r, 1.23 * Math.PI, 0.77 * Math.PI);
        ctx.lineTo(startX + puzzleWidth, puzzleWidth + 2 * r);
        ctx.lineTo(0 + startX, puzzleWidth + 2 * r);
        ctx.lineTo(0 + startX, puzzleWidth / 2 + 2 * r +6);
        ctx.arc(startX + r - 2, puzzleWidth / 2 + 2 * r, r, 0.65 * Math.PI, 1.23 * Math.PI, true);
        ctx.lineTo(0 + startX, 2 * r);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();
    }

    function initPuzzlePosition(callback) {
        // 被填充的拼图起始位置必须大于覆盖拼图的位置
        const fillPuzzleStart = 5 + puzzleObj.puzzleWidth;
        if (props.refresh === null || props.refresh === undefined) {
            // 如果用户未定义刷新方法 则由组件自己初始化拼图位置
            let puzzlePosition = {
                "puzzleX": Math.ceil(fillPuzzleStart + Math.random() * (props.width - puzzleObj.puzzleWidth - fillPuzzleStart)),
                "puzzleY": Math.ceil(Math.random() * (props.height - puzzleObj.puzzleWidth)),
                "backgroundPath": `${bgArray[puzzleObj.bgIndex++ % 6]}`
            };

            setPuzzlePosition(puzzlePosition, callback);
        } else {
            props.refresh(puzzlePosition => {
                // 如果是用户传入的拼图位置 需要进行限制
                puzzlePosition.puzzleX = Math.max(fillPuzzleStart, puzzlePosition.puzzleX);
                puzzlePosition.puzzleX = Math.min(props.width - puzzleObj.puzzleWidth, puzzlePosition.puzzleX);
                puzzlePosition.puzzleY = Math.max(0, puzzlePosition.puzzleY);
                puzzlePosition.puzzleY = Math.min(props.height - puzzleObj.puzzleWidth, puzzlePosition.puzzleY);

                setPuzzlePosition(puzzlePosition, callback);
            });
        }
        
    }

    function setPuzzlePosition(puzzlePosition, callback) {
        // 设置背景图片
        imageWrap.value.style.cssText += `
            background-image: url(${puzzlePosition.backgroundPath});
        `;
        // 设置拼图位置
        fillPuzzle.value.style.cssText += `
            left: ${puzzlePosition.puzzleX}px;
            top: ${puzzlePosition.puzzleY}px;
        `;

        coverPuzzle.value.style.cssText += `
            left: 0;
            top: ${puzzlePosition.puzzleY}px;
        `;
        // 保存被填充的puzzle的位置 用于绘制待覆盖的拼图位置
        puzzleObj.fillPuzzlePositionX = puzzlePosition.puzzleX;
        puzzleObj.fillPuzzlePositionY = puzzlePosition.puzzleY;

        // 绘制拼图
        // 绘制要覆盖的拼图
        const coverCtx = coverPuzzle.value.getContext('2d');
        // 将图片设置到画布上
        // 设置图片信息 用于扣拼图
        bgImg.value.src = puzzlePosition.backgroundPath;
        bgImg.value.onload = () => {
            coverCtx.drawImage(bgImg.value, -puzzleObj.fillPuzzlePositionX, -puzzleObj.fillPuzzlePositionY, props.width, props.height);
        };

        // 加载完成执行回调
        callback();
    }

    return {
        puzzleObj,
        initPuzzlePosition,
    };
}
</script>

<style scoped lang="stylus">
#awesome_slider_default
    border 1px solid #eee
    box-shadow 4px 4px 6px #eee
    padding 5px
    .image-area
        margin-bottom 10px
        position relative
        overflow hidden
        .cover
            position absolute
            z-index 1000
            cursor pointer
        .fill
            position absolute
            z-index 999
        img
            display none
        .load
            display flex
            justify-content center
            align-items center
            position absolute
            top 0
            bottom 0
            left 0
            right 0
            z-index 1002
            background-color rgba(244, 248, 252, 0.9)
            img
                display block
                height 30px
                width 30px
                animation rotate 1.5s linear infinite
        .refresh
            height 25px
            width 25px
            background-size 20px 20px
            background-repeat no-repeat
            background-position 2px 2px
            position absolute
            top 0
            right 0
            cursor pointer
            z-index 1001
    .silder-area
        height 35px
        width calc(100% - 2px)
        position relative
        line-height 35px
        text-align center
        color #fff
        user-select none
        background linear-gradient(to right, #a0cfff, #a0cfff 0%, #ddd 0%, #ddd)
        .slider
            width 43px
            height 33px
            background-color #fff
            border-style solid 
            border-color #eee
            border-width 1px
            cursor pointer
            background-size 29px 29px
            background-repeat no-repeat
            background-position 8px 3px
            position absolute
            top 0px
            left 0px
            &:hover
            &:active
                background-color rgb(83, 168, 255)
                border-color #409EFF

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
}
</style>
