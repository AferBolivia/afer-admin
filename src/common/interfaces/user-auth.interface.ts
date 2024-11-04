import { UserBase } from "./user.interface"

export interface AuthResponse {
  user: UserBase
  token: string
}

export interface AuthPayload {
  email: string
  password: string
}
