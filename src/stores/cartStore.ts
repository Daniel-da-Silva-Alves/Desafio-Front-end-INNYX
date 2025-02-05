import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from './productStore'

// Interface que define a estrutura de um item no carrinho, estendendo a interface Product
interface CartItem extends Product {
  quantity: number // Adiciona a quantidade de itens no carrinho
}

// Definição da store 'cart' usando Pinia
export const useCartStore = defineStore('cart', () => {
  // Estado inicial da store
  const items = ref<CartItem[]>(JSON.parse(localStorage.getItem('cartItems') || '[]')) // Carrega os itens do carrinho do localStorage ou inicializa com um array vazio
  
  // Computed property para calcular o total do carrinho
  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
  })

  // Computed property para calcular o total de itens no carrinho
  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  // Função para adicionar um produto ao carrinho
  function addToCart(product: Product) {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++ // Incrementa a quantidade se o produto já estiver no carrinho
    } else {
      items.value.push({ ...product, quantity: 1 }) // Adiciona o produto ao carrinho com quantidade 1
    }
    saveToLocalStorage() // Salva os itens no localStorage
  }

  // Função para remover um produto do carrinho
  function removeFromCart(productId: number) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1) // Remove o produto do carrinho
    }
    saveToLocalStorage() // Salva os itens no localStorage
  }

  // Função para limpar o carrinho
  function clearCart() {
    items.value = [] // Limpa todos os itens do carrinho
    saveToLocalStorage() // Salva os itens no localStorage
  }

  // Função para salvar os itens no localStorage
  function saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(items.value))
  }

  // Retorna as propriedades e funções da store
  return {
    items,
    total,
    totalItems,
    addToCart,
    removeFromCart,
    clearCart
  }
})