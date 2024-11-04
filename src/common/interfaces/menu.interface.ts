import { CategoryResponse } from "./category.interface"
import { Picture } from "./picture.interface"

import { FOLDER_IMAGES } from "@/common/config/folder"

export interface MenuResponse {
  id?: number
  name: string
  description: string
  price: number
  status: number | boolean
  id_category?: number
  id_picture?: number
  picture: Picture
  category: CategoryResponse
  created_at: string
  updated_at: string
}

export interface MenuPayload {
  name: string
  description: string
  price: number
  status: number | boolean
  id_category?: number
  image: File
  folder: FOLDER_IMAGES
}
