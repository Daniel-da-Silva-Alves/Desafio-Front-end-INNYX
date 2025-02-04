<template>
  <div class="admin-layout">
    <header class="admin-header">
      <h1></h1>
      <nav>
        <router-link to="/admin/products">Products</router-link>
      </nav>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
// Admin layout logic here
</script>

<style lang="scss" scoped>
.admin-layout {
  min-height: 100vh;
}
</style>