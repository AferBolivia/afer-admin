import { UserParams } from "../interfaces/users.interface"
import UserService from "../services/user.service"

const userService = new UserService()

export const getUsers = async (data: UserParams) => {
  const response = await userService.getUsers(data)
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

export const cancelUserPetition = async () => {
  await userService.cancelPetition()
}
