import { AuthResponse } from "@/common/interfaces/user-auth.interface"

export function verifyAuthLocal() {
  return localStorage.getItem("auth") !== null
}

export function getAuthLocal(): AuthResponse | null {
  const auth: AuthResponse = JSON.parse(localStorage.getItem("auth") || "")
  if (!auth) {
    return null
  }
  return auth
}

export function setAuthLocal(user: AuthResponse) {
  localStorage.setItem("auth", JSON.stringify(user))
}

export function removeAuthLocal() {
  localStorage.removeItem("auth")
}
