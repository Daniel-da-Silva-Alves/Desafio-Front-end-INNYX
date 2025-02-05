<template>
  <admin-layout>
    <div class="add-product">
      <form @submit.prevent="handleSubmit" class="form-container">
        <h2>Novo Produto</h2>
        <div class="form-group">
          <label for="name">Nome do produto</label>
          <input
            type="text"
            id="name"
            v-model="product.name"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="price">Preço</label>
          <input
            type="text"
            id="price"
            v-model="formattedPrice"
            @input="formatPrice"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Descrição</label>
          <textarea
            id="description"
            v-model="product.description"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="image">Imagem do produto</label>
          <input
            type="file"
            id="image"
            @change="handleFileChange"
            required
          />
        </div>

        <button type="submit" class="btn primary">Adicionar produto</button>
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
  price: '', // Alterado para string
  description: '',
  image: ''
})

const formattedPrice = ref('')

const formatPrice = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  value = (parseInt(value) / 100).toFixed(2)
  formattedPrice.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(value))
  product.value.price = formattedPrice.value // Armazena o valor formatado como moeda
}

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    uploadImage(file)
  }
}

const uploadImage = async (file: File) => {
  // Implementar lógica de upload de imagem
  // Exemplo: upload para um serviço de armazenamento e obter a URL da imagem
  const imageUrl = await fakeUploadService(file)
  product.value.image = imageUrl
}

const handleSubmit = () => {
  productStore.addProduct(product.value)
  router.push('/admin/products')
}

// Função de upload fictícia para fins de exemplo
const fakeUploadService = async (file: File) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(URL.createObjectURL(file))
    }, 1000)
  })
}
</script>

<style lang="scss" scoped>
.add-product {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  h2 {
    margin-bottom: 2rem;
  }

  .form-container {
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transform: scale(0.9); // Reduzir proporcionalmente em 30%
  }

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

  .btn {
    display: block;
    width: 100%;
    padding: 0.75rem;
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;
  }

  .btn.primary {
    background-color: var(--primary-color);
  }

  .btn.primary:hover {
    filter: brightness(0.9); // Ajusta o brilho para escurecer a cor
  }
}
</style>