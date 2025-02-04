import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './styles/global.scss'
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa o JavaScript do Bootstrap

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')