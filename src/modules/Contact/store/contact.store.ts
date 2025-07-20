import { defineStore } from 'pinia'
import { ref } from 'vue'
import { errorHandler } from '../../error-handling/ErrorHandlingService'

export const useContactStore = defineStore('contact', () => {
  const loading = ref(false)
  const error = ref<null | string>(null)
  const success = ref(false)

  async function submitContactForm(form: { name: string; email: string; message: string }) {
    loading.value = true
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success.value = true
      error.value = null
    } catch (e) {
      errorHandler.handleError(e, { strategy: 'silent' })
      error.value = 'Submission failed.'
      success.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    submitContactForm,
  }
})
