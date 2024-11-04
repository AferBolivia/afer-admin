import { Pagination } from "./pagination.interface"

export interface ResponseGeneric<T> {
  pagination: Pagination
  data: T
}
