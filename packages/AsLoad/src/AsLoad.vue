<template>
    <div class="as-load" :style="wrapStyle">
        <div class="container" :style="colorStyle">
            <div class="load-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :width="iconSize" :height="iconSize" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve">
                    <rect x="0" y="9.22656" width="4" height="12.5469" fill="currentColor">
                        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                    </rect>
                    <rect x="10" y="5.22656" width="4" height="20.5469" fill="currentColor">
                        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                    </rect>
                    <rect x="20" y="8.77344" width="4" height="13.4531" fill="currentColor">
                        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                    </rect>
                </svg>
            </div>
            <div class="load-desc">
                {{description}}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import type { IconSize } from "./AsLoadOptions.types";

export default defineComponent({
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
        iconSize: {
            type: String as PropType<IconSize>,
            default: "small"
        }
    },
    setup(props) {
        return {
            wrapStyle: computed(() => ({
                "background-color": `rgba(255, 255, 255, ${props.alpha})`,
            })),
            colorStyle: computed(() => ({
                "color": props.color
            })),
            iconSize: computed(() => {
                let fontSize = 30;
                console.log("======", props.iconSize);
                if (props.iconSize === "medium") {
                    fontSize = 50;
                }
                if (props.iconSize === "large") {
                    fontSize = 70;
                }
                return fontSize + 'px';
            }),
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
