import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import AwesomeSliderAuth from "../package";

createApp(App)
.use(AwesomeSliderAuth)
.mount('#app')
