<template>
    <div id="awesome_slider_default" ref="sliderWrap">
        <div class="image-area" ref="imageWrap">
            <canvas class="cover" ref="coverPuzzle"></canvas>
            <canvas class="fill" ref="fillPuzzle"></canvas>
        </div>
        <div class="silder-area" ref="sliderBar">
            <span>{{ tips }}</span>
            <div class="slider" 
            @mousedown="sliderDownEvent" 
            ref="slider"></div>
        </div>
    </div>
</template>

<script>
import {ref, onMounted} from "vue";

export default {
    name: 'as-default-slider',
    props: {
        // 背景图片
        "background-path": {
            type: String,
            default: "../../public/slider/default-slider-bg.png"
        },
        // 图片区域宽度
        width: {
            type: Number,
            default: 450
        },
        // 图片区域高度
        height: {
            type: Number,
            default: 250
        },
        // 移动拼图前的提示
        tips: {
            type: String,
            default: '移动滑块，完成拼图'
        },
        // 刷新图片时的回调函数
        refresh: Function,
        // 拼图之间允许的误差大小 默认为10像素
        errorRange: {
            type: Number,
            default: 10
        }
    },
    setup(props) {
        const imageWrap = ref(null);
        const sliderWrap = ref(null);
        const slider = ref(null);
        const sliderBar = ref(null);
        const coverPuzzle = ref(null);
        const fillPuzzle = ref(null);

        onMounted(() => {
            // 设置slider背景
            imageWrap.value.style.cssText += `
                background-image: url(${props.backgroundPath});
                height: ${props.height}px;
                width: ${props.width}px;
                background-size: ${props.width}px ${props.height}px;
                background-repeat: no-repeat;
            `;

            sliderWrap.value.style.cssText += `
                width: ${props.width}px;
            `;
        });
        
        let puzzleObj = drawPuzzleGather(coverPuzzle, props, fillPuzzle);
        
        return Object.assign({
            imageWrap,
            sliderWrap,
            slider,
            sliderBar,
            coverPuzzle,
            fillPuzzle,
        }, sliderMoveGather(sliderBar, slider, coverPuzzle, fillPuzzle, puzzleObj, props), puzzleObj);
    }
}

function sliderMoveGather(sliderBar, slider, coverPuzzle, fillPuzzle, puzzleObj, props) {
    // 滑块能否被点击
    let sliderObj = {
        mouseDownFlag: true,
    };

    function sliderDownEvent(e) {
        if (!sliderObj.mouseDownFlag) {
            return;
        }
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
            const percent = sliderMoveLength / sliderBar.value.offsetWidth * 100;
            // 填充滑块已经移动区域的颜色
            sliderBar.value.style.cssText += `
                background: linear-gradient(to right, #a0cfff, #a0cfff ${percent}%, #eee ${percent}%, #eee);
            `;
            // 移动拼图
            // 获取拼图和滑块的移动比例 即计算出滑块移动一个单位相当于拼图移动多少个单位  拼图可移动距离 / 滑块可移动距离
            let moveRate = (sliderBar.value.offsetWidth - puzzleObj.puzzleWidth) / (sliderBar.value.offsetWidth - slider.value.offsetWidth);
            coverPuzzle.value.style.cssText += `
                left: ${(sliderMoveLength + 5) * moveRate}px;
            `;
        }

        document.onmouseup = e => {
            document.onmousemove = null;
            // 暂时将滑块颜色保持为选中样式（防止认证过慢导致样式丢失）
            slider.value.style.cssText += `
                background-color: rgb(83, 168, 255);
                border-color: #409EFF;
                background-image: url('../../../public/slider/default-slider-arrow-select.png');
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
                alert("成功");
            } else {
                // 认证失败
                alert("失败");
            }
        }
    }

    return {
        sliderDownEvent,
    }
}

function drawPuzzleGather(coverPuzzle, props, fillPuzzle) {
    let puzzleObj = {
        puzzleWidth: 0,
    };

    onMounted(() => {
        const puzzleWidth = props.height * 0.2;
        // 绘制要覆盖的拼图
        const coverCtx = coverPuzzle.value.getContext('2d');
        drawPuzzlePath(coverCtx, puzzleWidth);
        coverCtx.stroke();
        // 绘制被填充的拼图
        const fillCtx = fillPuzzle.value.getContext('2d');
        drawPuzzlePath(fillCtx, puzzleWidth);
        fillCtx.fill();
        // 初始化拼图位置
        initPuzzlePosition();
    });

    function drawPuzzlePath(ctx, puzzleWidth) {
        // 设置拼图小圆半径
        const r = puzzleWidth / 6;
        // 计算拼图整体的大小（包括圆圈）
        puzzleObj.puzzleWidth = puzzleWidth + 2 * r;
        ctx.beginPath();
        ctx.moveTo(0, 2 * r);
        ctx.lineTo(puzzleWidth / 2 - 6, 2 * r);
        ctx.arc(puzzleWidth / 2, r + 2, r, 0.7 * Math.PI, 2.3 * Math.PI);
        ctx.lineTo(puzzleWidth, 2 * r);
        ctx.lineTo(puzzleWidth, puzzleWidth / 2 + 2 * r - 6);
        ctx.arc(puzzleWidth + r - 2, puzzleWidth / 2 + 2 * r, r, 1.2 * Math.PI, 0.8 * Math.PI);
        ctx.lineTo(puzzleWidth, puzzleWidth + 2 * r);
        ctx.lineTo(0, puzzleWidth + 2 * r);
        ctx.lineTo(0, puzzleWidth / 2 + 2 * r + 6);
        ctx.arc(r - 2, puzzleWidth / 2 + 2 * r, r, 0.8 * Math.PI, 1.2 * Math.PI, true);
        ctx.lineTo(0, 2 * r);
    }

    function initPuzzlePosition() {
        let puzzlePosition;
        if (props.refresh === null || props.refresh === undefined) {
            // 如果用户未定义刷新方法 则由组件自己初始化拼图位置
            // 被填充的拼图起始位置必须大于覆盖拼图的位置
            const fillPuzzleStart = 5 + puzzleObj.puzzleWidth;
            puzzlePosition = {
                "puzzleX": Math.ceil(fillPuzzleStart + Math.random() * (props.width - puzzleObj.puzzleWidth - fillPuzzleStart)),
                "puzzleY": Math.ceil(Math.random() * (props.height - puzzleObj.puzzleWidth)),
            };
        } else {
            puzzlePosition = props.refresh();
            // 如果是用户传入的拼图位置 需要进行限制
            puzzlePosition.puzzleX = Math.max(fillPuzzleStart, puzzlePosition.puzzleX);
            puzzlePosition.puzzleX = Math.min(props.width - puzzleObj.puzzleWidth, puzzlePosition.puzzleX);
            puzzlePosition.puzzleY = Math.max(0, puzzlePosition.puzzleY);
            puzzlePosition.puzzleY = Math.max(props.height - puzzleObj.puzzleWidth, puzzlePosition.puzzleY);
        }
        // 设置拼图位置
        fillPuzzle.value.style.cssText += `
            left: ${puzzlePosition.puzzleX}px;
            top: ${puzzlePosition.puzzleY}px;
        `;

        coverPuzzle.value.style.cssText += `
            top: ${puzzlePosition.puzzleY}px;
        `;
    }

    return puzzleObj;
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
        .cover
            position absolute
            z-index 1000
            left 5px
        .fill
            position absolute
            z-index 999
    .silder-area
        height 35px
        width calc(100% - 2px)
        position relative
        line-height 35px
        text-align center
        color #909399
        user-select none
        background linear-gradient(to right, #a0cfff, #a0cfff 0%, #eee 0%, #eee)
        .slider
            width 43px
            height 33px
            background-color #fff
            border-style solid 
            border-color #eee
            border-width 1px
            cursor pointer
            background-image url('../../../public/slider/default-slider-arrow.png')
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
                background-image url('../../../public/slider/default-slider-arrow-select.png')
</style>
