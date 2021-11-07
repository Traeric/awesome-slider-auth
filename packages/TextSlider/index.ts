import type { App } from "vue";
import TextSlider from "./src/TextSlider.vue";

TextSlider.install = (app: App) => {
    app.component(TextSlider.name, TextSlider);
}

export default TextSlider;
