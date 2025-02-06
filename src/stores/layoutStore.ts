// Importa a função defineStore do Pinia para definir uma store
import { defineStore } from 'pinia'

// Define a interface para o estado do layout
interface LayoutState {
  isSidebarOpen: boolean
}

// Define a store do layout
export const useLayoutStore = defineStore('layout', {
  // Define o estado inicial da store
  state: (): LayoutState => ({
    isSidebarOpen: window?.innerWidth >= 992 // Inicialmente aberto em desktop
  }),
  
  // Define as ações da store
  actions: {
    // Alterna o estado da sidebar
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    
    // Abre a sidebar
    openSidebar() {
      this.isSidebarOpen = true
    },
    
    // Fecha a sidebar
    closeSidebar() {
      this.isSidebarOpen = false
    }
  }
})