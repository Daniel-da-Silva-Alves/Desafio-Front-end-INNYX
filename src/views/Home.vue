<template>
  <client-layout>
    <div class="home">
      <h1>Bem-vindo(a) à Innyx Store!</h1>
      <p>Clique no botão abaixo para ver o nosso catálogo</p>
      <router-link to="/products" class="btn primary">
        Ver Catálogo
      </router-link>
    </div>
  </client-layout>
</template>

<script setup lang="ts">
import ClientLayout from '@/layouts/ClientLayout.vue'
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
  padding: 2rem;
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
  background-color: #5a2d82; /* Ajuste a cor de fundo para um tom mais escuro */
  border-color: #5a2d82; /* Ajuste a cor da borda para um tom mais escuro */
}
</style>