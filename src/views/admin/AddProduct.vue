<template>
  <admin-layout>
    <div class="add-product">
      <!-- Formulário para adicionar um novo produto -->
      <form @submit.prevent="handleSubmit" class="form-container">
        <h2>Novo Produto</h2>
        
        <!-- Campo para o nome do produto -->
        <div class="form-group">
          <label for="name">Nome do produto</label>
          <input
            type="text"
            id="name"
            v-model="product.name"
            required
          />
        </div>
        
        <!-- Campo para o preço do produto -->
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

        <!-- Campo para a descrição do produto -->
        <div class="form-group">
          <label for="description">Descrição</label>
          <textarea
            id="description"
            v-model="product.description"
            required
          ></textarea>
        </div>

        <!-- Campo para a imagem do produto -->
        <div class="form-group">
          <label for="image">Imagem do produto</label>
          <div class="file-input-container">
            <button class="choose-file-btn" @click="triggerFileInput">Escolher arquivo</button>
            <input
              type="file"
              id="image"
              @change="handleFileChange"
              ref="fileInput"
              style="display: none;"
              required
            />
            <input
              type="text"
              v-model="product.image"
              placeholder="URL da imagem"
              readonly
              class="image-url"
            />
          </div>
        </div>

        <!-- Botão para adicionar o produto -->
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

// Inicializa o roteador e a store de produtos
const router = useRouter()
const productStore = useProductStore()

// Referência reativa para o novo produto
const product = ref({
  name: '',
  price: 0, // Alterado para number
  description: '',
  image: ''
})

// Referência reativa para o preço formatado
const formattedPrice = ref('')
// Referência para o input de arquivo
const fileInput = ref<HTMLInputElement | null>(null)

// Função para formatar o preço no formato de moeda brasileira
const formatPrice = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  value = (parseInt(value) / 100).toFixed(2)
  formattedPrice.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(value))
  product.value.price = parseFloat(value) // Armazena o valor como número
}

// Função para lidar com a mudança de arquivo
const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    product.value.image = URL.createObjectURL(file) // Atualiza a URL da imagem
  }
}

// Função para enviar o formulário
const handleSubmit = () => {
  productStore.addProduct(product.value)
  router.push('/admin/products')
}

// Função para disparar o input de arquivo
const triggerFileInput = () => {
  fileInput.value?.click()
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

  .file-input-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .choose-file-btn {
    padding: 0.5rem;
    background-color: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    border-radius: 4px;
    cursor: pointer;
    height: 100%; /* Garante que o botão tenha a mesma altura do campo de texto */
    transition: background-color 0.3s, color 0.3s;
  }

  .choose-file-btn:hover {
    background-color: var(--primary-color);
    color: white;
  }

  .image-url {
    flex: 1; /* Faz o campo de texto ocupar o espaço restante */
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    cursor: not-allowed; /* Indica que o campo é somente leitura */
    height: 100%; /* Garante que o campo de texto tenha a mesma altura do botão */
  }
}
</style>