import { defineComponent } from "vue";

export const VNode = defineComponent({
    props: {
        content: [String, Object]
    },
    render(): any {
        return this.content;
    }
});