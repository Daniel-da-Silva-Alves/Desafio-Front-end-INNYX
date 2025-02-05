<template>
  <div class="admin-layout d-flex flex-column vh-100">

    <!-- Header Fixo -->
    <header class="header fixed-top bg-purple shadow-sm">
      <nav class="navbar navbar-dark">
        <div class="container">
          <!-- Botão Toggle Sidebar -->
          <button 
            class="btn btn-link text-white d-lg-none" 
            @click="layoutStore.toggleSidebar"
          >
            <i class="bi bi-list fs-4"></i>
          </button>

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
              <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Configurações</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="/"><i class="bi bi-box-arrow-right me-2"></i>Sair</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Container Principal -->
    <div class="content-wrapper d-flex flex-grow-1 overflow-auto">

      <!-- Sidebar -->
      <aside
        class="sidebar bg-light shadow-sm" 
        :class="{ 'show': layoutStore.isSidebarOpen }"
      >
        <div class="sidebar-sticky pt-3">
          <!-- Cabeçalho da Sidebar -->
          <div class="text-center mb-4">
            <i class="bi bi-person-circle fs-3 text-purple"></i>
            <h5 class="mt-2 text-purple">Área do Administrador</h5>
          </div>
          <ul class="nav flex-column">
            <!-- Listar produto -->
            <li class="nav-item">
              <router-link 
                to="/admin/products" 
                class="nav-link"
                active-class="active"
              >
                <i class="bi bi-grid me-2"></i>
                Lista de Produtos
              </router-link>
            </li>
            <!-- Adicionar produto -->
            <li class="nav-item">
              <router-link 
                to="/admin/products/add" 
                class="nav-link"
                active-class="active"
              >
                <i class="bi bi-plus-circle me-2"></i>
                Adicionar Produto
              </router-link>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Conteúdo Principal -->
      <main class="main-content p-4">
        <slot></slot>
      </main>
    </div>

    <!-- Footer Fixo -->
    <footer class="footer mt-auto py-3 bg-light border-top">
      <div class="container-fluid text-center">
        <span class="text-muted">© 2025 Innyx Store. Todos os direitos reservados.</span>
      </div>
    </footer>

    <!-- Overlay para mobile -->
    <div 
      v-if="layoutStore.isSidebarOpen" 
      class="sidebar-overlay d-lg-none"
      @click="layoutStore.toggleSidebar"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useLayoutStore } from '@/stores/layoutStore'

// Store do layout
const layoutStore = useLayoutStore()

// Fecha o sidebar quando a tela é redimensionada para desktop
const handleResize = () => {
  if (window.innerWidth >= 992 && !layoutStore.isSidebarOpen) {
    layoutStore.openSidebar()
  } else if (window.innerWidth < 992 && layoutStore.isSidebarOpen) {
    layoutStore.closeSidebar()
  }
}

// Lifecycle hooks
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
// Variáveis
$header-height: 56px;
$sidebar-width: 280px;
$purple-color: #bb0cbb;
$text-color: #213547;

// Estilos do Header
.header {
  height: $header-height;
  z-index: 1030;
}

// Cor do background do Header
.bg-purple {
  background-color: $purple-color;
}

// Cor do texto em Roxo
.text-purple {
  color: $purple-color;
}

// Estilos do Content Wrapper
.content-wrapper {
  margin-top: $header-height;
  overflow: hidden; // Adicionado para eliminar a barra de rolagem lateral
}

// Estilos da Sidebar
.sidebar {
  width: $sidebar-width;
  height: calc(100vh - #{$header-height});
  position: fixed;
  left: 0;
  transition: transform 0.3s ease;
  z-index: 1020;

  .nav-link {
    color: $purple-color;
    padding: 0.75rem 1rem;
    
    &:hover {
      background-color: rgba($purple-color, 0.1);
    }
    
    &.active {
      background-color: rgba($purple-color, 0.15);
      font-weight: 600;
    }
  }

  @media (max-width: 991.98px) {
    transform: translateX(-100%);
    
    &.show {
      transform: translateX(0);
    }
  }
}

// Estilos do Main Content
.main-content {
  margin-left: $sidebar-width;
  width: calc(100% - #{$sidebar-width});
  min-height: calc(100vh - #{$header-height});
  
  @media (max-width: 991.98px) {
    margin-left: 0;
    width: 100%;
  }
}

// Overlay para mobile
.sidebar-overlay {
  position: fixed;
  top: $header-height;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.361);
  z-index: 1015;
}

// Estilos do Footer
.footer {
  z-index: 1020;
}
</style>