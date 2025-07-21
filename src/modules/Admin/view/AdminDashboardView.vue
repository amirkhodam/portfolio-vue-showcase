<template>
  <div class="container mx-auto py-8">
    <h1 class="mb-6 text-2xl font-bold">Admin Dashboard</h1>
    <nav class="mb-8 flex gap-4">
      <router-link to="/admin/portfolios" class="text-blue-600 hover:underline"
        >Manage Portfolios</router-link
      >
      <router-link to="/admin/about" class="text-blue-600 hover:underline"
        >Edit About Us</router-link
      >
      <router-link to="/admin/contact" class="text-blue-600 hover:underline"
        >Edit Contact Us</router-link
      >
      <button @click="logout" class="ml-auto rounded bg-red-500 px-4 py-2 text-white">
        Logout
      </button>
    </nav>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { useAdminAuthStore } from '../store/adminAuth.store'
import { useRouter } from 'vue-router'
const store = useAdminAuthStore()
const router = useRouter()
function logout() {
  store.logout()
  router.push({ name: 'AdminLogin' })
}
</script>
