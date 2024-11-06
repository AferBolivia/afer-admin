import { Pagination } from "./pagination.interface"
import { UserResponse } from "./users.interface"
import { GENDER } from "../enums/gender.enum"

export interface ClientVisit {
  id: number
  id_client: number
  created_at: Date
}

export interface ClientResponse {
  id: number
  fullname: string
  birthday: string
  gender: GENDER
  cellphone: string
  email: string
  address: string
  visit_count: number
  id_user: number
  users?: UserResponse
  visits?: ClientVisit[]
  created_at?: Date
  updated_at?: Date
}

// export interface UserPayload {
//   name: string
//   email: string
//   password: string
//   status: boolean
// }

export interface ClientParams {
  page?: number
  limit?: number
  search?: string
  id_user?: number
  visited?: number
  birthday?: Date
  birthday_start?: Date
  birthday_end?: Date
  gender?: GENDER
}

export interface ClientResult {
  clients: ClientResponse[]
  pagination: Pagination
}
