<template>
  <button
    :class="['btn', variant]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang="scss" scoped>
.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &.primary {
    background-color: var(--primary-color);
    color: white;
  }
}
</style>