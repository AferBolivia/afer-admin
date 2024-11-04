import { Picture } from "./picture.interface"

import { FOLDER_IMAGES } from "@/common/config/folder"

export interface CategoryResponse {
  id: number
  name: string
  description: string
  id_picture: number
  picture?: Picture
  created_at: string
  updated_at: string
}

export interface CategoryPayload {
  name?: string
  description?: string
  image?: File
  folder?: FOLDER_IMAGES
}
