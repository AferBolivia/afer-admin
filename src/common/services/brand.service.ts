import HttpRequest from "./http.service"
import { BrandParams, BrandResult } from "../interfaces/brand.interface"

const BRANDS_ENDPOINT = "brands"

class BrandService extends HttpRequest {
  public async getBrands(params: BrandParams) {
    this.configRequest({
      endpoint: BRANDS_ENDPOINT,
    })
    return this.getWithParams<BrandParams, BrandResult>(params)
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

export default BrandService
