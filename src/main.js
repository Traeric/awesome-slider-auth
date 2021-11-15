import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import AwesomeSliderAuth from "../packages";

createApp(App)
.use(AwesomeSliderAuth)
.mount('#app')
