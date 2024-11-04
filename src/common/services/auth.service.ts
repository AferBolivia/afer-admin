import HttpRequest from "./http.service"

import { AuthPayload, AuthResponse } from "@/common/interfaces/user-auth.interface"

const AUTH_LOGIN_ENDPOINT = "auth/login"

class AuthService extends HttpRequest {
  public async login(data: AuthPayload) {
    this.configRequest({
      endpoint: AUTH_LOGIN_ENDPOINT,
    })
    return this.post<AuthPayload, AuthResponse>(data)
  }
}

export default AuthService
