import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IPortfolio } from '../../api/services/portfolio'
import { useServices } from '../../api'
import { errorHandler } from '../../error-handling/ErrorHandlingService'

export const usePortfolioStore = defineStore('portfolio', () => {
  const portfolios = ref<Array<IPortfolio>>([
    {
      id: '664a1b2c3d4e5f6789012345',
      title: { en: 'Modern Architecture', fr: 'Architecture Moderne' },
      videos: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'],
      images: [
        'https://blog.architizer.com/wp-content/uploads/Lotus-Tmple-Photo-by-Arpan-Das-980x614.jpg',
        'https://blog.architizer.com/wp-content/uploads/maxresdefault-3-768x508.jpg',
      ],
      texts: {
        en: ['A showcase of modern design.', 'Award-winning project.'],
        fr: ['Une vitrine du design moderne.', 'Projet primé.'],
      },
      createdAt: new Date('2024-05-01T10:00:00.000Z'),
      updatedAt: new Date('2024-05-01T10:00:00.000Z'),
    },
    {
      id: '664a1b2c3d4e5f6789012346',
      title: { en: 'Classic Villa', fr: 'Villa Classique' },
      videos: [],
      images: [
        'https://www.utilitydesign.co.uk/wp/wp-content/uploads/2017/06/HAC_photo_by_Iwan_Baan_2.jpg',
      ],
      texts: {
        en: ['Inspired by timeless elegance.'],
        fr: ["Inspiré par l'élégance intemporelle."],
      },
      createdAt: new Date('2024-05-02T12:00:00.000Z'),
      updatedAt: new Date('2024-05-02T12:00:00.000Z'),
    },
  ])
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
      errorHandler.handleError(e, { strategy: 'silent' })
    } finally {
      loading.value = false
    }
  }

  return {
    portfolios,
    loading,
    error,

    fetchPortfolio,
    fetchPortfolios,
  }
})
