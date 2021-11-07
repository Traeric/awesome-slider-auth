import { defineComponent } from "vue";

export const VNode = defineComponent({
    props: {
        content: Object
    },
    render(): any {
        return this.content;
    }
});