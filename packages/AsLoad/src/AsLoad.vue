<template>
    <div class="as-load" :style="wrapStyle">
        <div class="container" :style="colorStyle">
            <div class="load-icon">
                <loading />
            </div>
            <div class="load-desc">
                {{description}}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import loading from '../../AsIcons/src/load.vue';
import { computed, defineComponent } from 'vue'

export default defineComponent({
  components: { loading },
    props: {
        alpha: {
            type: Number,
            default: 1
        },
        description: String,
        color: {
            type: String,
            default: '#5ca07a'
        },
    },
    setup(props) {
        return {
            wrapStyle: computed(() => ({
                "background-color": `rgba(255, 255, 255, ${props.alpha})`,
            })),
            colorStyle: computed(() => ({
                "color": props.color
            })),
        };
    },
})
</script>
<style lang="stylus" scoped>
.as-load
    position absolute
    inset 0
    z-index 10000
    display flex
    justify-content center
    align-items center
    .container
        display flex
        align-items center
        flex-direction column
        .load-desc
            margin-top 10px
</style>
