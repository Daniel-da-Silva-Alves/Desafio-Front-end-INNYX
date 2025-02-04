<template>
  <div class="products-client">
    <h2>Our Products</h2>
    
    <div class="products-grid" v-if="productStore.products.length">
      <div v-for="product in productStore.products" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p class="price">${{ product.price }}</p>
        <p class="description">{{ product.description }}</p>
        <button @click="cartStore.addToCart(product)" class="btn primary">
          Add to Cart
        </button>
      </div>
    </div>
    <p v-else>No products available.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'

const productStore = useProductStore()
const cartStore = useCartStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<style lang="scss" scoped>
.products-client {
  padding: 2rem;

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .product-card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 4px;

    .price {
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--primary-color);
      margin: 0.5rem 0;
    }

    .description {
      margin-bottom: 1rem;
    }
  }
}
</style>