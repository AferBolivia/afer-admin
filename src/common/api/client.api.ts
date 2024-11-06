import { ClientParams } from "../interfaces/clients.interface"
import ClientService from "../services/client.service"

const clientService = new ClientService()

export const getClients = async (data: ClientParams) => {
  const response = await clientService.getClients(data)
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

export const cancelClientPetition = async () => {
  await clientService.cancelPetition()
}
