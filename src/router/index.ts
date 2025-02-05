import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue') // renderiza a home.vue component
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: () => import('@/views/admin/Products.vue') // renderiza a admin/products.vue component
  },
  {
    path: '/admin/products/add',
    name: 'AddProduct',
    component: () => import('@/views/admin/AddProduct.vue') // renderiza a admin/addProduct.vue component
  },
  {
    path: '/admin/products/edit/:id',
    name: 'EditProduct',
    component: () => import('@/views/admin/EditProduct.vue') // renderiza a admin/editProduct.vue component
  },
  {
    path: '/products',
    name: 'ClientProducts',
    component: () => import('@/views/client/Products.vue') // renderiza a client/products.vue component
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/client/Checkout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router