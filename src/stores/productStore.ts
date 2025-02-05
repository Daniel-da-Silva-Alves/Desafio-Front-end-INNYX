import { defineStore } from 'pinia'

// Interface que define a estrutura de um produto
export interface Product {
  id: number
  name: string
  price: string // Alterado para string para armazenar o valor formatado como moeda
  description: string
  image: string
}

// Definição da store 'productStore' usando Pinia
export const useProductStore = defineStore('productStore', {
  // Estado inicial da store
  state: () => ({
    // Carrega os produtos do localStorage ou inicializa com um array vazio
    products: JSON.parse(localStorage.getItem('products') || '[]') as Product[]
  }),
  // Ações que podem ser executadas na store
  actions: {
    // Salva os produtos no localStorage
    saveToLocalStorage() {
      localStorage.setItem('products', JSON.stringify(this.products))
    },
    // Adiciona um novo produto à lista de produtos
    addProduct(product: Omit<Product, 'id'>) {
      this.products.push({
        id: Date.now(), // Gera um ID único baseado no timestamp atual
        name: product.name,
        description: product.description,
        price: product.price, // Armazena o valor formatado como moeda
        image: product.image
      })
      this.saveToLocalStorage() // Salva a lista atualizada no localStorage
    },
    // Edita um produto existente na lista de produtos
    editProduct(updatedProduct: Product) {
      const index = this.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        this.products[index] = updatedProduct
        this.saveToLocalStorage() // Salva a lista atualizada no localStorage
      }
    },
    // Remove um produto da lista de produtos
    deleteProduct(productId: number) {
      this.products = this.products.filter(p => p.id !== productId)
      this.saveToLocalStorage() // Salva a lista atualizada no localStorage
    },
    // Retorna a lista de produtos
    getProducts() {
      return this.products
    },
    // Pesquisa produtos na lista de produtos com base em uma query
    searchProducts(query: string) {
      const lowerQuery = query.toLowerCase()
      return this.products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      )
    }
  }
})