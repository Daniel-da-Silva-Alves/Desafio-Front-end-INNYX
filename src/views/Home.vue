<template>
  <div class="home">
    <h1>Welcome to Our Store</h1>
    <router-link to="/products" class="cta-button">
      Browse Products
    </router-link>
  </div>
</template>

<script setup lang="ts">
// Home page logic here
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