import { UserResponse } from "./users.interface"

export interface AuthResponse {
  user: UserResponse
  token: string
}

export interface AuthPayload {
  email: string
  password: string
}
