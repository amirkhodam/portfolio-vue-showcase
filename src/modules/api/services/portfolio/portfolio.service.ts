import { Service } from '../service'
import type { IMediaRemove, IPortfolio, IPortfolioBase, IUploadMedia } from './portfolio.interface'

export class PortfolioService extends Service {
  async getPortfolios() {
    return this.get<Array<IPortfolio>>('/portfolios')
  }

  async getPortfolio(id: string) {
    return this.get<IPortfolio>(`/portfolios/${id}`)
  }

  async createPortfolio(body: IPortfolioBase) {
    return this.post<IPortfolio, IPortfolioBase>('/portfolios', body)
  }

  async updatePortfolio(body: IPortfolioBase) {
    return this.put<IPortfolio, IPortfolioBase>(`/portfolios/${body.id}`, body)
  }

  async patchPortfolio(id: string, body: Partial<IPortfolioBase>) {
    return this.patch<IPortfolio, Partial<IPortfolioBase>>(`/portfolios/${id}`, body)
  }

  async deletePortfolio(id: string) {
    return this.delete(`/portfolios/${id}`)
  }

  async searchPortfolios(query: string) {
    return this.get<Array<IPortfolio>>(`/portfolios?search=${encodeURIComponent(query)}`)
  }

  async uploadMedia(formData: IUploadMedia) {
    const { id, form } = formData
    return this.post<IPortfolio, FormData>(`/portfolios/${id}/add-media`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  async removeMedia(id: string) {
    return this.post<IPortfolio>(`/portfolios/${id}/remove-media`)
  }

  async removeSingleMedia(body: IMediaRemove) {
    return this.post<IPortfolio>(`/portfolios/${body.id}/remove-media/${body.mediaId}`)
  }
}
