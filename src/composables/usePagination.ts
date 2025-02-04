import { ref, computed } from 'vue'

export function usePagination(items, itemsPerPage = 10) {
  const currentPage = ref(1)
  
  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return items.value.slice(start, end)
  })

  const totalPages = computed(() => 
    Math.ceil(items.value.length / itemsPerPage)
  )

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  return {
    currentPage,
    paginatedItems,
    totalPages,
    nextPage,
    prevPage
  }
}