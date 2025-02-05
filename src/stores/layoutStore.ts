// src/stores/layoutStore.ts
import { defineStore } from 'pinia'

interface LayoutState {
  isSidebarOpen: boolean
}

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => ({
    isSidebarOpen: window?.innerWidth >= 992 // Inicialmente aberto em desktop
  }),
  
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    
    openSidebar() {
      this.isSidebarOpen = true
    },
    
    closeSidebar() {
      this.isSidebarOpen = false
    }
  }
})