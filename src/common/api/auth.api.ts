import { logout, login } from "@/common/helpers/auth.helper"
import { removeAuthLocal, setAuthLocal } from "@/common/helpers/user-verify-local"
import AuthService from "@/common/services/auth.service"

const authService = new AuthService()

export const startSession = async (email: string, password: string) => {
  const response = await authService.login({
    email,
    password,
  })
  const jwt = response.data.token

  if (!jwt) {
    logout()

    throw new Error("Error al obtener token")
  }

  login(`Bearer ${jwt}`)
  setAuthLocal({
    user: response.data.user,
    token: response.data.token,
  })
  authService.useToken(jwt)

  return response.data
}

export const closeSession = async () => {
  logout()
  removeAuthLocal()
}
