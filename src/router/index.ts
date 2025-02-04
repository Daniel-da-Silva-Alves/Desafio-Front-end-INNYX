import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: () => import('@/views/admin/Products.vue')
  },
  {
    path: '/admin/products/add',
    name: 'AddProduct',
    component: () => import('@/views/admin/AddProduct.vue')
  },
  {
    path: '/admin/products/edit/:id',
    name: 'EditProduct',
    component: () => import('@/views/admin/EditProduct.vue')
  },
  {
    path: '/products',
    name: 'ClientProducts',
    component: () => import('@/views/client/Products.vue')
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