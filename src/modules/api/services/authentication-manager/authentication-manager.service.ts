import { Service } from '../service'
import type { AxiosInstance } from 'axios'
import { AuthenticationService } from '../../../api/services/authentication-manager'

export class AuthenticationManagerService extends Service {
  public authentication: AuthenticationService

  constructor(protected readonly adaptor: AxiosInstance) {
    super(adaptor)
    this.authentication = new AuthenticationService(adaptor)
  }
}
