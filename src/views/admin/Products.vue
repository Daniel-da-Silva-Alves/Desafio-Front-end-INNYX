<template>
  <admin-layout>
    <div class="products-admin">
      <h2>Products Management</h2>
      <router-link to="/admin/products/add" class="btn primary">
        Add New Product
      </router-link>
      
      <div class="products-list" v-if="productStore.products.length">
        <div v-for="product in productStore.products" :key="product.id" class="product-item">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }}</p>
          <div class="actions">
            <router-link :to="`/admin/products/edit/${product.id}`" class="btn secondary">
              Edit
            </router-link>
          </div>
        </div>
      </div>
      <p v-else>No products found.</p>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import AdminLayout from '@/layouts/AdminLayout.vue'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<style lang="scss" scoped>
.products-admin {
  padding: 2rem;

  .products-list {
    margin-top: 2rem;
  }

  .product-item {
    padding: 1rem;
    border: 1px solid #ddd;
    margin-bottom: 1rem;
    border-radius: 4px;

    .actions {
      margin-top: 1rem;
    }
  }
}
</style>