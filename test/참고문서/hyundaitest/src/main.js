import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'
import commonJs from './assets/script/common'

const app = createApp(App)

app.use(router)
app.use(commonJs)
app.use(VCalendar, {
    componentPrefix: 'v',
    masks: {
        title: 'YYYY' + '.' + 'MM',
        navMonth: 'MM',
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
        date: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
        dayPopover: 'YYYY-MM-DD'
    }
})
app.provide('$axios', axios)
app.provide('$router', router)
app.mount('#hmsec')

window.app = app