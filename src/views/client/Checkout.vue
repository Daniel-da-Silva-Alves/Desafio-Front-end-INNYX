<template>
  <div class="checkout">
    <h2>Checkout</h2>
    
    <div class="cart-items" v-if="cartStore.items.length">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <h3>{{ item.name }}</h3>
        <p>Quantidade: {{ item.quantity }}</p>
        <p>Preço: R$ {{ (parseFloat(item.price) * item.quantity).toFixed(2) }}</p>
      </div>
      
      <div class="cart-total">
        <h3>Total: R$ {{ cartStore.total.toFixed(2) }}</h3>
      </div>
      
      <div class="checkout-button">
        <button @click="finalizePurchase" class="btn primary">
          Finalizar compra
        </button>
      </div>
    </div>
    <p v-else>Seu carrinho está vazio.</p>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

function finalizePurchase() {
  alert('Compra finalizada!')
  cartStore.clearCart()
  router.push('/')
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

  .checkout-button {
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    .btn.primary {
      color: #fff;
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }

    .btn.primary:hover {
      color: #fff;
      background-color: #5a2d82; /* Ajuste a cor de fundo para um tom mais escuro */
      border-color: #5a2d82; /* Ajuste a cor da borda para um tom mais escuro */
    }
  }
}
</style>