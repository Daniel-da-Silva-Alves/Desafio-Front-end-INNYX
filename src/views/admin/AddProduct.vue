<template>
  <admin-layout>
    <div class="add-product">
      <h2>Add New Product</h2>
      <form @submit.prevent="handleSubmit">
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

        <button type="submit" class="btn primary">Add Product</button>
      </form>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const productStore = useProductStore()

const product = ref({
  name: '',
  price: 0,
  description: ''
})

async function handleSubmit() {
  // Implement product creation logic here
  await router.push('/admin/products')
}
</script>

<style lang="scss" scoped>
.add-product {
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