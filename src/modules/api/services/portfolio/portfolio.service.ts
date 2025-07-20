import { Service } from '../service'
import type { IPortfolio } from './portfolio.interface'

export class PortfolioService extends Service {
  async getPortfolios() {
    return this.get<Array<IPortfolio>>('/portfolios')
  }

  async getPortfolio(id: string) {
    return this.get<IPortfolio>(`/portfolios/${id}`)
  }
}
