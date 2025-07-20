import { Service } from '../service'
import type { IPortfolio } from './portfolio.interface'

export class PortfolioService extends Service {
  async getPortfolios() {
    return this.get<IPortfolio>('/portfolios')
  }
}
