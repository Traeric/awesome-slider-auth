<template>
    <AuthBar>
        <div class="text-slider-wrap">
            
        </div>
    </AuthBar>
    <canvas
        style="border: 1px solid #000"
        class="text-one" ref="textOne"></canvas>
</template>
<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import "../style/index.styl";
import AuthBar from "../../components/AuthBar.vue";
import defaultBackground from "../../../public/slider/bg1.jpg";

const textOne = ref<HTMLCanvasElement>() as Ref<HTMLCanvasElement>;

onMounted(() => {
    const backgroundImg: HTMLImageElement = new Image();
    backgroundImg.src = defaultBackground;
    backgroundImg.onload =() => {
        const ctx = textOne.value.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(backgroundImg, 0, 0, 300, 150);

        ctx.font = 'italic bolder 30px FangSong';
        ctx.textAlign = 'center';
        ctx.strokeStyle = "#fff";
        ctx.save();
        ctx.translate(50, 50);
        ctx.rotate(Math.PI / 180 * 60);
        ctx.strokeText('探', 0, 0);
        ctx.restore();
        const width = ctx.measureText('探').width;

        ctx.strokeStyle = "#67C23A";
        // ctx.translate(50 + width, 50);
        // ctx.rotate(Math.PI / 180 * 30);
        ctx.strokeText('林', 50 + width, 50);
        console.log(ctx.measureText('探'));
    }
});

</script>
<script lang="ts">
export default {
    name: "as-text-slider"
}
</script>
<style lang="stylus" scoped>

</style>