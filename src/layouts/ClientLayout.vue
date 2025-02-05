<template>
  <div class="client-layout d-flex flex-column min-vh-100">
    <!-- Header -->
    <header class="header fixed-top bg-purple">
      <nav class="navbar navbar-dark">
        <div class="container">
          <!-- Logo e Nome -->
          <div class="navbar-brand d-flex align-items-center">
            <i class="bi bi-shop fs-4 me-2"></i>
            <span class="fw-bold">Innyx Store</span>
          </div>

          <!-- Menu Usuário -->
          <div class="dropdown">
            <button 
              class="btn btn-link text-white dropdown-toggle"
              type="button"
              id="userMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle" style="font-size: 1.3rem;"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
              <li>
                <a class="dropdown-item" href="/admin/products">
                  <i class="bi bi-person-circle me-2 text-purple"></i>
                  Área do Administrador
                </a>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item" href="#">
                  <i class="bi bi-box-arrow-right me-2"></i>
                  Sair
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Barra de Busca -->
    <div class="search-container bg-light border-bottom">
      <div class="container py-3">
        <div class="d-flex align-items-center">
          <div class="input-group me-3">
            <span class="input-group-text bg-white">
              <i class="bi bi-search"></i>
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Buscar produtos..."
            >
          </div>
          <!-- Carrinho -->
          <a href="/checkout" class="nav-link text-dark position-relative">
            <i class="bi bi-cart-fill fs-5"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ totalItems }}
            </span>
          </a>
        </div>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <main class="main-content flex-grow-1">
      <div class="container py-4">
        <slot></slot>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer py-3 bg-light border-top">
      <div class="container text-center">
        <span class="text-muted">© 2025 Innyx Store. Todos os direitos reservados.</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const totalItems = computed(() => {
  return cartStore.totalItems
})
</script>

<style lang="scss" scoped>
// Variáveis
$header-height: 56px;
$search-height: 70px;
$purple-color: #bb0cbb;

// Header
.header {
  height: $header-height;
  background-color: $purple-color;
}

// Search
.search-container {
  margin-top: $header-height;
  height: $search-height;
}

// Main Content
.main-content {
  margin-top: $search-height;
}

// Footer
.footer {
  margin-top: auto;
}
</style>