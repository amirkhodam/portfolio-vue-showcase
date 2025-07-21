import { defineStore } from 'pinia'
import { ref } from 'vue'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

export const useAdminAuthStore = defineStore('adminAuth', () => {
  const isAuthenticated = ref(false)
  const error = ref<string | null>(null)

  function login(username: string, password: string) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      isAuthenticated.value = true
      error.value = null
      return true
    } else {
      error.value = 'Invalid username or password.'
      isAuthenticated.value = false
      return false
    }
  }

  function logout() {
    isAuthenticated.value = false
  }

  return { isAuthenticated, error, login, logout }
})
