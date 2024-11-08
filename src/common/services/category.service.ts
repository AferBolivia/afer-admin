import HttpRequest from "./http.service"

import { CategoryParams, CategoryResult } from "@/common/interfaces/category.interface"

const CATEGORIES_ENDPOINT = "categories"

class CategoryService extends HttpRequest {
  public async getCategories(params: CategoryParams) {
    this.configRequest({
      endpoint: CATEGORIES_ENDPOINT,
    })
    return this.getWithParams<CategoryParams, CategoryResult>(params)
  }

  // public async getCategoryById(id: number) {
  //   this.configRequest({
  //     endpoint: `${CATEGORIES_ENDPOINT}/${id}`,
  //   })
  //   return this.get<CategoryResponse>()
  // }

  // public async createCategory(data: CategoryPayload) {
  //   this.configRequest({
  //     endpoint: CATEGORIES_ENDPOINT,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   return this.post<CategoryPayload, CategoryResponse>(data)
  // }

  // public async updateCategory(id: number, data: CategoryPayload) {
  //   this.configRequest({
  //     endpoint: `${CATEGORIES_ENDPOINT}/${id}`,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   return this.post<CategoryPayload, CategoryResponse>(data)
  // }
}

export default CategoryService
