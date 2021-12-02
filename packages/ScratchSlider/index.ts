import { App } from "vue";
import ScratchSlider from "./src/ScratchSlider.vue";

ScratchSlider.install = (app: App) => {
    app.component(ScratchSlider.name, ScratchSlider);
}

export default ScratchSlider;
