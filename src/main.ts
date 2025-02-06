// Importa a função createApp do Vue para criar a aplicação
import { createApp } from 'vue'

// Importa a função createPinia do Pinia para gerenciar o estado da aplicação
import { createPinia } from 'pinia'

// Importa o roteador da aplicação
import router from './router'

// Importa os estilos globais da aplicação
import './styles/global.scss'

// Importa o componente raiz da aplicação
import App from './App.vue'

// Importa o JavaScript do Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Cria a aplicação Vue
const app = createApp(App)

// Cria a instância do Pinia
const pinia = createPinia()

// Adiciona o Pinia à aplicação
app.use(pinia)

// Adiciona o roteador à aplicação
app.use(router)

// Monta a aplicação no elemento com o id 'app'
app.mount('#app')