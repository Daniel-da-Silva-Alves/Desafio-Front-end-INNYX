<template>
  <client-layout>
    <div class="checkout">
      <!-- Título da seção de produtos selecionados -->
      <h2 class="text-center">Produtos Selecionados</h2>
      
      <!-- Verifica se há itens paginados no carrinho -->
      <div class="cart-items" v-if="paginatedItems.length">
        <!-- Grid de produtos -->
        <div class="products-grid">
          <!-- Itera sobre os itens paginados e exibe cada um em um cartão -->
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
        
        <!-- Total do carrinho -->
        <div class="cart-total">
          <h3>Total: {{ formatPrice(cartStore.total) }}</h3>
        </div>
        
        <!-- Botão para finalizar a compra -->
        <div class="checkout-button">
          <button @click="finalizePurchase" class="btn primary">
            Finalizar compra
          </button>
        </div>
        
        <!-- Navegação de paginação -->
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
      
      <!-- Mensagem exibida quando o carrinho está vazio -->
      <p v-else class="text-center mt-4">Seu carrinho está vazio.</p>
    </div>
  </client-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
import ClientLayout from '@/layouts/ClientLayout.vue'

// Inicializa a store do carrinho e o roteador
const cartStore = useCartStore()
const router = useRouter()

// Referências reativas para a página atual e o número de itens por página
const currentPage = ref(1)
const itemsPerPage = 3

// Computed property para calcular o número total de páginas
const totalPages = computed(() => Math.ceil(cartStore.items.length / itemsPerPage))

// Computed property para obter os itens paginados
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return cartStore.items.slice(start, end)
})

// Função para navegar para a página anterior
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Função para navegar para a próxima página
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Função para navegar para uma página específica
const goToPage = (page: number) => {
  currentPage.value = page
}

// Função para formatar o preço no formato de moeda brasileira
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

// Função para finalizar a compra
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