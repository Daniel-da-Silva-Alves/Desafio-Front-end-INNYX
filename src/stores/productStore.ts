import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)

  async function fetchProducts() {
    loading.value = true
    try {
      // Implementar busca de produtos
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    fetchProducts
  }
})