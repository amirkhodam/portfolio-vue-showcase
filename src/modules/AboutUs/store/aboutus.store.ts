import { defineStore } from 'pinia'
import { ref } from 'vue'
import { errorHandler } from '../../error-handling/ErrorHandlingService'

export const useAboutUsStore = defineStore('aboutus', () => {
  const aboutUs = ref({
    title: { en: 'About Our Studio', fr: 'À propos de notre studio' },
    texts: {
      en: ['We are passionate about architecture.', 'Award-winning team.'],
      fr: ["Nous sommes passionnés d'architecture.", 'Équipe primée.'],
    },
  })
  const loading = ref(false)
  const error = ref<null | string>(null)

  async function fetchAboutUs() {
    loading.value = true
    try {
      // Simulate API call
      error.value = null
    } catch (e) {
      errorHandler.handleError(e, { strategy: 'silent' })
    } finally {
      loading.value = false
    }
  }

  return {
    aboutUs,
    loading,
    error,
    fetchAboutUs,
  }
})
