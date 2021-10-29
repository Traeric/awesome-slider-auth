<template>
    <AuthBar>
        <div class="simple-wrap" ref="containerRef">
            <div class="img-area" ref="imgRef" :style="'background-image: url(' + background + ')'">
                <canvas ref="canvasTest"></canvas>
            </div>
            <div class="slider-area">
                <span>{{ tips }}</span>
                <div class="slider-btn">
                    <i class="iconfont icon-zuobian"></i>
                </div>
            </div>
        </div>  
    </AuthBar>
    <canvas ref="canvasTest"></canvas>
</template>
<script setup>
import AuthBar from "../../components/AuthBar.vue";
import background from "../../../public/slider/default-slider-bg-2.png";
import { onMounted, ref } from '@vue/runtime-core';

const containerRef = ref();
const imgRef = ref();
const canvasTest = ref();

onMounted(() => {
    const containerWidth = containerRef.value.offsetWidth;
    imgRef.value.style.height = `${0.5 * containerWidth}px`;
});

defineProps({
    tips: {
        type: String,
        default: "移动滑块，完成拼图",
    },
});


const img = new Image();
img.src = "/slider/default-slider-bg-2.png";
img.onload = () => {
    const unit = 50;
    canvasTest.value.width = unit * 1;
    canvasTest.value.height = unit * 1;
    const ctx = canvasTest.value.getContext('2d');
    ctx.beginPath();
    // 设置线段效果
    ctx.lineCap = "round";
    ctx.lineJoin  = "round";
    ctx.lineWidth = 5;
    ctx.moveTo(canvasTest.value.width / 2, 0);
    ctx.lineTo(0, canvasTest.value.height);
    ctx.lineTo(canvasTest.value.width, canvasTest.value.height);
    ctx.lineTo(canvasTest.value.width / 2, 0);

    let gradient = ctx.createRadialGradient(50, 50, 0, 50, 50, 30);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, '#000');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.globalCompositeOperation="destination-over";

    ctx.closePath();
    ctx.moveTo(canvasTest.value.width / 2, 0);
    ctx.lineTo(0, canvasTest.value.height);
    ctx.lineTo(canvasTest.value.width, canvasTest.value.height);
    ctx.lineTo(canvasTest.value.width / 2, 0);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(img, 0, 0, canvasTest.value.width, canvasTest.value.height);

    // const imageData = ctx.getImageData(0, 0, canvasTest.value.width, canvasTest.value.height);
    // sepia(imageData);
    // ctx.putImageData(imageData, 0, 0);
    
}





const sepia = function (pixels) {
    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      let r = d[i];
      let g = d[i + 1];
      let b = d[i + 2];
      d[i]     = (r * 0.393) + (g * 0.769) + (b * 0.189); // red
      d[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // green
      d[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // blue
    }
    return pixels;
};


const grayscale = function (pixels) {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i];
    let g = d[i + 1];
    let b = d[i + 2];
    d[i] = d[i + 1] = d[i + 2] = (r + g + b) / 3;
  }
  return pixels;
};

const red = function (pixels) {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i];
    let g = d[i + 1];
    let b = d[i + 2];
    d[i] = (r + g + b)/3;        // 红色通道取平均值
    d[i + 1] = d[i + 2] = 0; // 绿色通道和蓝色通道都设为0
  }
  return pixels;
};

const brightness = function (pixels, delta) {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] += delta;     // red
    d[i + 1] += delta; // green
    d[i + 2] += delta; // blue
  }
  return pixels;
};
</script>
<script>
export default {
    name: "as-puzzle-slider",
}
</script>
<style lang="stylus" scoped>
@import "../../Style/animation.styl"
.simple-wrap
    width 100%
    box-sizing border-box
    border 1px solid #eee
    padding 5px
    overflow hidden
    transition all .5s
    .img-area
        width 100%
        height (150 / 16)em
        background-size cover
        margin-bottom (10 / 16)em
    .slider-area
        width 100%
        height (35 / 16)em
        background linear-gradient(to right, #a0cfff, #a0cfff 0%, #ddd 0%, #ddd)
        position relative
        text-align center
        line-height (35 / 16)em
        .slider-btn
            height calc(2.1875em - 2px)
            width (50 / 16)em
            background-color #fff
            border 1px solid #eee
            position absolute
            top 0
            left 0
            display flex
            justify-content center
            align-items center
            i
                font-size 1.5em
                color #e6e6e6
                transform rotate(180deg)
            &:hover, &:active
                background-color #53a8ff
                border-color #409eff
                cursor move
                i
                    color #fff
        span
            font-size (12 / 16)em
            color #fff
            user-select none
</style>
