import { Pagination } from "./pagination.interface"

import { FOLDER_IMAGES } from "@/common/config/folder"

export interface CategoryResponse {
  id: number
  name: string
  description: string
  icon: string
  parent_id_category: number
  created_at: string
  updated_at: string
}

export interface CategoryPayload {
  name?: string
  description?: string
  image?: File
  folder?: FOLDER_IMAGES
}

export interface CategoryParams {
  page?: number
  limit?: number
  search?: string
}

export interface CategoryResult {
  categories: CategoryResponse[]
  pagination: Pagination
}
