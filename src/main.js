import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import awesomeSliderAuth from '../package';

createApp(App)
.use(awesomeSliderAuth)
.mount('#app')
