import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import AwesomeSliderAuth from "../packages";
import "../packages/Style/index.css";
import "../packages/theme-chalk/index.styl";

createApp(App)
.use(AwesomeSliderAuth)
.mount('#app')
