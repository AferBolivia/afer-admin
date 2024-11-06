import { BrandResponse } from "./brand.interface"
import { CategoryResponse } from "./category.interface"
import { Pagination } from "./pagination.interface"
import { Picture } from "./picture.interface"
import { PRODUCT_STATUS } from "../enums/product.enum"

export interface ProductResponse {
  id: number
  name: string
  description: string
  price: number
  stock: number
  status: PRODUCT_STATUS
  id_category: number
  id_brand: number
  id_picture: number
  category: CategoryResponse
  brand: BrandResponse
  picture: Picture
  created_at: string
  updated_at: string
}

// export interface ProductPayload {
//   name?: string
//   description?: string
//   image?: File
//   folder?: FOLDER_IMAGES
// }

export interface ProductParams {
  page?: number
  limit?: number
  search?: string
  category_id?: number
  max_price?: number
  brand_id?: number
}

export interface ProductResult {
  products: ProductResponse[]
  pagination: Pagination
}
