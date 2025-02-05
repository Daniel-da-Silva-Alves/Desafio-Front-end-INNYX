<template>
  <client-layout>
    <div class="checkout">
      <h2 class="text-center">Produtos Selecionados</h2>
      
      <div class="cart-items" v-if="paginatedItems.length">
        <div class="products-grid">
          <div v-for="item in paginatedItems" :key="item.id" class="product-card">
            <div class="card">
              <img :src="item.image" class="card-img-top" :alt="item.name">
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">Quantidade: {{ item.quantity }}</p>
                <p class="card-text">Preço: {{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="cart-total">
          <h3>Total: {{ formatPrice(cartStore.total) }}</h3>
        </div>
        
        <div class="checkout-button">
          <button @click="finalizePurchase" class="btn primary">
            Finalizar compra
          </button>
        </div>
        
        <nav aria-label="Page navigation example" class="mt-4">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="prevPage">Anterior</a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
              <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="nextPage">Próximo</a>
            </li>
          </ul>
        </nav>
      </div>
      <p v-else>Seu carrinho está vazio.</p>
    </div>
  </client-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
import ClientLayout from '@/layouts/ClientLayout.vue'

const cartStore = useCartStore()
const router = useRouter()

const currentPage = ref(1)
const itemsPerPage = 3

const totalPages = computed(() => Math.ceil(cartStore.items.length / itemsPerPage))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return cartStore.items.slice(start, end)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

function finalizePurchase() {
  alert('Compra finalizada!')
  cartStore.clearCart()
  router.push('/')
}
</script>

<style lang="scss" scoped>
.checkout {
  padding: 2rem;

  .text-center {
    text-align: center;
  }

  .cart-items {
    margin-top: 2rem;
  }

  .products-grid {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: center; /* Centraliza os cartões */
    margin-bottom: 1rem; /* Ajuste a margem inferior para controlar a distância */
  }

  .product-card {
    flex: 0 0 auto;
    width: 250px;
    margin-right: 1rem;
  }

  .card {
    width: 100%;
    height: 100%; /* Garante que todos os cartões tenham a mesma altura */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-img-top {
    width: 100%;
    height: auto;
  }

  .card-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

  .pagination {
    margin-top: 1rem;
  }

  .page-item.active .page-link {
    background-color: var(--primary-color); /* Define a cor de fundo da página ativa */
    border-color: var(--primary-color); /* Define a cor da borda da página ativa */
    color: white; /* Define a cor do texto da página ativa */
  }
}
</style>