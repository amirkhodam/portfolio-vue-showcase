import { Service } from '../../service'
import type { ILogin, ILoginResponse } from './authentication.interfaces'

export class AuthenticationService extends Service {
  public login(data: ILogin) {
    return this.post<ILoginResponse, ILogin>('/api/u-crm/auth/refresh', data)
  }
}
