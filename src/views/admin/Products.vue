<template>
  <admin-layout>
    <!-- Barra de busca para filtrar produtos centralizada no topo -->
    <div class="admin-search-container">
      <div class="input-group">
        <span class="input-group-text bg-white">
          <i class="bi bi-search"></i>
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Buscar produto por nome ou descrição..."
          v-model="searchQuery"
          @input="currentPage = 1"
        />
      </div>
    </div>

    <div class="products-admin">
      <!-- Cabeçalho da lista de produtos -->
      <h2 class="catalog-header">Lista de Produtos</h2>
      
      <!-- Grid de produtos -->
      <div class="products-grid">
        <!-- Verifica se há produtos paginados e itera sobre eles -->
        <template v-if="paginatedProducts.length">
          <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
            <div class="card">
              <img :src="product.image" class="card-img-top" :alt="product.name">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">
                  {{ truncatedDescription(product.description) }}
                  <span v-if="product.description.length > maxDescriptionLength"
                        @click="toggleReadMore(product.id)" class="read-more">
                    {{ product.readMore ? '... Ler menos' : '... Ler mais' }}
                  </span>
                </p>
                <p class="card-text price"><strong>{{ formatPrice(product.price) }}</strong></p>
                <router-link :to="`/admin/products/edit/${product.id}`" class="btn primary">
                  Editar Produto
                </router-link>
              </div>
            </div>
          </div>
        </template>
        <!-- Mensagem exibida quando não há produtos -->
        <template v-else>
          <p class="text-center mt-4">Você não adicionou produtos ainda.</p>
        </template>
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
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import AdminLayout from '@/layouts/AdminLayout.vue'

// Inicializa a store de produtos
const productStore = useProductStore()

// Referências reativas para a página atual, busca e produtos por página
const currentPage = ref(1)
const searchQuery = ref('')
const productsPerPage = 3
const maxDescriptionLength = 100

// Computed property para filtrar os produtos com base na busca
const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) {
    return productStore.products
  }
  const lowerQuery = searchQuery.value.trim().toLowerCase()
  return productStore.products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  )
})

// Computed property para calcular o número total de páginas com base nos produtos filtrados
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / productsPerPage))

// Computed property para obter os produtos paginados a partir dos produtos filtrados
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage
  const end = start + productsPerPage
  return filteredProducts.value.slice(start, end).map(product => ({
    ...product,
    readMore: false
  }))
})

// Função para truncar a descrição do produto
const truncatedDescription = (description: string) => {
  return description.length > maxDescriptionLength ? description.slice(0, maxDescriptionLength) : description
}

// Função para alternar entre expandir e contrair a descrição do produto
const toggleReadMore = (productId: number) => {
  const product = paginatedProducts.value.find(p => p.id === productId)
  if (product) {
    product.readMore = !product.readMore
  }
}

// Funções para navegação entre as páginas
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

// Função para formatar o preço do produto
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

// Lifecycle hook para carregar os produtos quando o componente é montado
onMounted(() => {
  productStore.getProducts()
})
</script>

<style lang="scss" scoped>
.products-admin {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.catalog-header {
  margin-bottom: 3rem; /* Ajuste a margem inferior para controlar a distância */
}

.admin-search-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.input-group {
  width: 100%;
  max-width: 600px;
}

.products-grid {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  justify-content: center;
  margin-bottom: 1rem;
}

.product-card {
  flex: 0 0 auto;
  width: 250px;
  margin-right: 1rem;
}

.card {
  width: 100%;
  height: 100%;
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

.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  color: var(--primary-color);
}

.read-more {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}

.pagination {
  margin-top: 1rem;
}

.page-item.active .page-link {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn.primary {
  color: #fff;
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn.primary:hover {
  color: #fff;
  background-color: #5a2d82;
  border-color: #5a2d82;
}
</style>