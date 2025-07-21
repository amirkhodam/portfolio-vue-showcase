import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IPortfolio, IPortfolioBase } from '@/modules/api'
import { useServices } from '@/modules/api'
import { errorHandler } from '@/modules/error-handling/ErrorHandlingService'

export const usePortfolioStore = defineStore('portfolio', () => {
  const portfolios = ref<Array<IPortfolio>>([])
  const loading = ref<boolean>(false)
  const error = ref<null | string>()
  const _service = useServices().portfolio

  async function fetchPortfolio(id: string) {
    try {
      const portfolio = await _service.getPortfolio(id)
      const index = portfolios.value.findIndex((p) => p.id === portfolio.id)
      if (index !== -1) {
        portfolios.value[index] = portfolio
      } else {
        portfolios.value.push(portfolio)
      }
      error.value = null
    } catch (e) {
      errorHandler.handleError(e, { strategy: 'silent' })
    } finally {
    }
  }

  async function fetchPortfolios() {
    loading.value = true
    try {
      portfolios.value = await _service.getPortfolios()
      error.value = null
    } catch (e) {
      console.log(e)
      errorHandler.handleError(e, { strategy: 'silent' })
    } finally {
      loading.value = false
    }
  }

  async function updatePortfolio(portfolio: IPortfolio) {
    _service.updatePortfolio(portfolio)

    const index = portfolios.value.findIndex((p) => p.id === portfolio.id)
    if (index !== -1) {
      portfolios.value[index] = { ...portfolio, updatedAt: new Date() }
    }
  }

  async function addPortfolio(portfolio: IPortfolioBase) {
    const newPortfolio = {
      ...portfolio,
    }
    portfolios.value.push(newPortfolio)
  }

  async function deletePortfolio(id: string) {
    portfolios.value = portfolios.value.filter((p) => p.id !== id)
  }

  // Add uploadMedia method
  async function uploadMedia({ id, form }: { id: string; form: FormData }) {
    try {
      await _service.uploadMedia({ id, form })
      // Fetch updated portfolio and update local list
      const updated = await _service.getPortfolio(id)
      const index = portfolios.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        portfolios.value[index] = updated
      } else {
        portfolios.value.push(updated)
      }
    } catch (e) {
      errorHandler.handleError(e, { strategy: 'silent' })
      throw e
    }
  }

  // Add removeSingleMedia method
  async function removeSingleMedia({ id, mediaId }: { id: string; mediaId: string }) {
    try {
      await _service.removeSingleMedia({ id, mediaId })
      // Fetch updated portfolio and update local list
      const updated = await _service.getPortfolio(id)
      const index = portfolios.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        portfolios.value[index] = updated
      } else {
        portfolios.value.push(updated)
      }
    } catch (e) {
      errorHandler.handleError(e, { strategy: 'silent' })
      throw e
    }
  }

  return {
    portfolios,
    loading,
    error,

    fetchPortfolio,
    fetchPortfolios,
    updatePortfolio,
    addPortfolio,
    deletePortfolio,
    uploadMedia,
    removeSingleMedia,
  }
})
