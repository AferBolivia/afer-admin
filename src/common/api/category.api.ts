import { CategoryPayload } from "@/common/interfaces/category.interface"
import CategoryService from "@/common/services/category.service"

const categoryService = new CategoryService()

export const getCategories = async () => {
  const response = await categoryService.getCategories()
  return response.data
}

export const getCategoryById = async (id: number) => {
  const response = await categoryService.getCategoryById(id)
  return response.data
}

export const createCategory = async (data: CategoryPayload) => {
  const response = await categoryService.createCategory(data)
  return response.data
}

export const updateCategory = async (id: number, data: CategoryPayload) => {
  const response = await categoryService.updateCategory(id, data)
  return response.data
}

export const cancelCategoryPetition = async () => {
  await categoryService.cancelPetition()
}
