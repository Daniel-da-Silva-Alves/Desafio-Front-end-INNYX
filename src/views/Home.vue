<template>
  <client-layout>
    <div class="home">
      <h1>Bem-vindo(a) à Innyx Store!</h1>
      <p>Clique no botão a baixo para ver o nosso catálogo</p>
      <router-link to="/products">
        <Button class="cta-button">
          Ver Catálogo
        </Button>
      </router-link>
    </div>
  </client-layout>
</template>

<script setup lang="ts">
import ClientLayout from '@/layouts/ClientLayout.vue'
import Button from '@/components/common/Button.vue'
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.cta-button {
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  
  &:hover {
    background-color: var(--secondary-color);
  }
}
</style>