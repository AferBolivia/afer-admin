import { BrandParams } from "../interfaces/brand.interface"
import BrandService from "../services/brand.service"


const brandService = new BrandService()

export const getBrands = async (data: BrandParams) => {
  const response = await brandService.getBrands(data)
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

export const cancelBrandPetition = async () => {
  await brandService.cancelPetition()
}
