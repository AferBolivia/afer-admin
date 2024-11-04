import HttpRequest from "./http.service"

import { UserParams, UserResult } from "@/common/interfaces/users.interface"


const USERS_ENDPOINT = "users"

class UserService extends HttpRequest {
  public async getUsers(params: UserParams) {
    this.configRequest({
      endpoint: USERS_ENDPOINT,
    })
    return this.getWithParams<UserParams, UserResult>(params)
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

export default UserService
