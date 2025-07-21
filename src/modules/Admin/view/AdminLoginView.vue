<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <form @submit.prevent="onLogin" class="w-96 rounded bg-white p-8 shadow-md">
      <h2 class="mb-6 text-center text-2xl font-bold">Admin Login</h2>
      <div class="mb-4">
        <label class="mb-1 block">Username</label>
        <input v-model="username" class="w-full rounded border px-3 py-2" />
      </div>
      <div class="mb-4">
        <label class="mb-1 block">Password</label>
        <input v-model="password" type="password" class="w-full rounded border px-3 py-2" />
      </div>
      <div v-if="error" class="mb-4 text-center text-red-500">{{ error }}</div>
      <button type="submit" class="bg-primary w-full rounded py-2 text-white">Login</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminAuthStore } from '../store/adminAuth.store'

const username = ref('')
const password = ref('')
const store = useAdminAuthStore()
const router = useRouter()

const error = store.error

function onLogin() {
  if (store.login(username.value, password.value)) {
    router.push({ name: 'AdminDashboard' })
  }
}
</script>
