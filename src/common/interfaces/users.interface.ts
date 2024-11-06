import { Pagination } from "./pagination.interface"
import { ROLES_ENABLED } from "../config/access"

export interface UserResponse {
  id: number
  name: string
  email: string
  status: number
  role?: ROLES_ENABLED
  created_at?: Date
  updated_at?: Date
}

export interface UserPayload {
  name: string
  email: string
  password: string
  status: boolean
}

export interface UserParams {
  page?: number
  limit?: number
  search?: string
  role?: ROLES_ENABLED
}

export interface UserResult {
  users: UserResponse[]
  pagination: Pagination
}
