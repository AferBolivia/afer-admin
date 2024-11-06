import HttpRequest from "./http.service"
import { ClientParams, ClientResult } from "../interfaces/clients.interface"

const CLIENTS_ENDPOINT = "clients"

class ClientService extends HttpRequest {
  public async getClients(params: ClientParams) {
    this.configRequest({
      endpoint: CLIENTS_ENDPOINT,
    })
    return this.getWithParams<ClientParams, ClientResult>(params)
  }

  // public async getCategoryById(id: number) {
  //   this.configRequest({
  //     endpoint: `${USERS_ENDPOINT}/${id}`,
  //   })
  //   return this.get<CategoryResponse>()
  // }

  // public async createCategory(data: CategoryPayload) {
  //   this.configRequest({
  //     endpoint: USERS_ENDPOINT,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   return this.post<CategoryPayload, CategoryResponse>(data)
  // }

  // public async updateCategory(id: number, data: CategoryPayload) {
  //   this.configRequest({
  //     endpoint: `${USERS_ENDPOINT}/${id}`,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   return this.post<CategoryPayload, CategoryResponse>(data)
  // }
}

export default ClientService
