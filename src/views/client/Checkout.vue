<template>
  <div class="checkout">
    <h2>Checkout</h2>
    
    <div class="cart-items" v-if="cartStore.items.length">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <h3>{{ item.name }}</h3>
        <p>Quantity: {{ item.quantity }}</p>
        <p>Price: ${{ item.price * item.quantity }}</p>
      </div>
      
      <div class="cart-total">
        <h3>Total: ${{ cartStore.total }}</h3>
        <button @click="handleCheckout" class="btn primary">
          Complete Purchase
        </button>
      </div>
    </div>
    <p v-else>Your cart is empty.</p>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

async function handleCheckout() {
  // Implement checkout logic here
  await router.push('/')
}
</script>

<style lang="scss" scoped>
.checkout {
  padding: 2rem;

  .cart-items {
    margin-top: 2rem;
  }

  .cart-item {
    border: 1px solid #ddd;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
  }

  .cart-total {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 2px solid #ddd;
    text-align: right;

    h3 {
      margin-bottom: 1rem;
    }
  }
}
</style>