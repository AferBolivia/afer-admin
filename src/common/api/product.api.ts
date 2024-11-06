import { ProductParams } from "../interfaces/product.interface"
import ProductService from "../services/product.service"


const productService = new ProductService()

export const getProducts = async (data: ProductParams) => {
  const response = await productService.getProducts(data)
  return response.data
}

// export const getCategoryById = async (id: number) => {
//   const response = await categoryService.getCategoryById(id)
//   return response.data
// }

// export const createCategory = async (data: CategoryPayload) => {
//   const response = await categoryService.createCategory(data)
//   return response.data
// }

// export const updateCategory = async (id: number, data: CategoryPayload) => {
//   const response = await categoryService.updateCategory(id, data)
//   return response.data
// }

export const cancelProductPetition = async () => {
  await productService.cancelPetition()
}
