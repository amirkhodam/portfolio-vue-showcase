import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IPortfolio, IPortfolioBase, IPortfolioCreate } from '@/modules/api'
import { useServices } from '@/modules/api'
import { errorHandler } from '@/modules/error-handling/ErrorHandlingService'

export const usePortfolioStore = defineStore('portfolio', () => {
  const portfolios = ref<Array<IPortfolio>>([])
  const loading = ref<boolean>(false)
  const error = ref<null | string>()
  const _service = useServices().portfolio
  const _BASE_MEDIA_URL = import.meta.env.VITE_MEDIA_ADDRESS

  function resetPath(path: string) {
    return path.replaceAll(`${_BASE_MEDIA_URL}/`, '')
  }

  function getPath(path: string) {
    return `${_BASE_MEDIA_URL}/${path}`
  }

  function serializePortfolio(portfolio: IPortfolio): IPortfolio {
    return {
      ...portfolio,
      media: portfolio.media.map((m) => ({ ...m, path: getPath(m.path) }))
    }
  }

  function setPortfolios(list: Array<IPortfolio>): void {
    portfolios.value = list.map(serializePortfolio)
  }

  function replacePortfolio(portfolio: IPortfolio): IPortfolio {
    const id = portfolio.id
    const serialized = serializePortfolio(portfolio)
    const index = portfolios.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      portfolios.value[index] = serialized
    } else {
      portfolios.value.push(serialized)
    }
    return serialized
  }

  async function fetchPortfolio(id: string) {
    try {
      const portfolio = await _service.getPortfolio(id)
      error.value = null
      return replacePortfolio(portfolio)
    } catch (e) {
      errorHandler.handleError(e, { strategy: 'console' })
    } finally {
    }
  }

  async function fetchPortfolios() {
    loading.value = true
    try {
      const portfolios = await _service.getPortfolios()
      setPortfolios(portfolios)
      error.value = null
    } catch (e) {
      errorHandler.handleError(e, { strategy: 'console' })
    } finally {
      loading.value = false
    }
  }

  async function updatePortfolio(portfolio: IPortfolio) {
    _service.updatePortfolio({
      ...portfolio,
      media: portfolio.media.map((m) => ({ ...m, path: resetPath(m.path) }))
    })

    const index = portfolios.value.findIndex((p) => p.id === portfolio.id)
    if (index !== -1) {
      portfolios.value[index] = { ...portfolio, updatedAt: new Date() }
    }
  }

  async function addPortfolio(portfolio: IPortfolioCreate) {
    const newPortfolio = await _service.createPortfolio(portfolio)
    portfolios.value.push(newPortfolio)
    return newPortfolio
  }

  async function deletePortfolio(id: string) {
    await _service.deletePortfolio(id)
    portfolios.value = portfolios.value.filter((p) => p.id !== id)
  }

  // Add uploadMedia method
  async function uploadMedia({ id, form }: { id: string; form: FormData }) {
    try {
      await _service.uploadMedia({ id, form })
      // Fetch updated portfolio and update local list
      const updated = await _service.getPortfolio(id)
      replacePortfolio(updated)
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
      replacePortfolio(updated)
    } catch (e) {
      errorHandler.handleError(e, { strategy: 'silent' })
      throw e
    }
  }

  // Add saveMediaOrder method
  async function saveMediaOrder({
    id,
    media
  }: {
    id: string
    media: { id: string; index: number }[]
  }) {
    try {
      // Find the current portfolio
      const portfolio = portfolios.value.find((p) => p.id === id)
      if (!portfolio) throw new Error('Portfolio not found')
      // Map the new order to the full media objects
      const newMediaOrder = media.map(({ id: mediaId, index }) => {
        const m = portfolio.media.find((mm) => mm.id === mediaId)
        if (!m) throw new Error('Media not found')
        return { ...m, index }
      })
      await _service.patchPortfolio(id, {
        media: newMediaOrder.map((m) => ({ ...m, path: resetPath(m.path) }))
      })
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
    saveMediaOrder
  }
})
