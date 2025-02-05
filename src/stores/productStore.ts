import { defineStore } from 'pinia'

interface Product {
  id: number
  name: string
  price: string // Alterado para string para armazenar o valor formatado como moeda
  description: string
  image: string
}

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: JSON.parse(localStorage.getItem('products') || '[]') as Product[]
  }),
  actions: {
    saveToLocalStorage() {
      localStorage.setItem('products', JSON.stringify(this.products))
    },
    addProduct(product: Omit<Product, 'id'>) {
      this.products.push({
        id: Date.now(),
        name: product.name,
        description: product.description,
        price: product.price, // Armazena o valor formatado como moeda
        image: product.image
      })
      this.saveToLocalStorage()
    },
    editProduct(updatedProduct: Product) {
      const index = this.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        this.products[index] = updatedProduct
        this.saveToLocalStorage()
      }
    },
    deleteProduct(productId: number) {
      this.products = this.products.filter(p => p.id !== productId)
      this.saveToLocalStorage()
    },
    getProducts() {
      return this.products
    },
    searchProducts(query: string) {
      const lowerQuery = query.toLowerCase()
      return this.products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      )
    }
  }
})