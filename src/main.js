import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import AwesomeSliderAuth from "../packages";
import "../packages/Style/index.css";

createApp(App)
.use(AwesomeSliderAuth)
.mount('#app')
