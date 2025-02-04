<template>
  <admin-layout>
    <div class="edit-product">
      <h2>Edit Product</h2>
      <form @submit.prevent="handleSubmit" v-if="product">
        <div class="form-group">
          <label for="name">Product Name</label>
          <input
            type="text"
            id="name"
            v-model="product.name"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="price">Price</label>
          <input
            type="number"
            id="price"
            v-model="product.price"
            step="0.01"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="product.description"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn primary">Update Product</button>
      </form>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()

const product = ref(null)

onMounted(async () => {
  const productId = route.params.id
  // Implement fetch product logic here
})

async function handleSubmit() {
  // Implement product update logic here
  await router.push('/admin/products')
}
</script>

<style lang="scss" scoped>
.edit-product {
  padding: 2rem;

  .form-group {
    margin-bottom: 1rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
    }

    input, textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }
}
</style>