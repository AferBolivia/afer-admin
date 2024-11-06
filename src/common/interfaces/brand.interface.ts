import { Pagination } from "./pagination.interface"
import { Picture } from "./picture.interface"

import { FOLDER_IMAGES } from "@/common/config/folder"

export interface BrandResponse {
  id: number
  name: string
  description: string
  id_picture: number
  picture: Picture
  created_at: string
  updated_at: string
}

export interface BrandPayload {
  name?: string
  description?: string
  image?: File
  folder?: FOLDER_IMAGES
}

export interface BrandParams {
  page?: number
  limit?: number
  search?: string
}

export interface BrandResult {
  brands: BrandResponse[]
  pagination: Pagination
}
