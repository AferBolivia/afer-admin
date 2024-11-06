import HttpRequest from "./http.service"
import { ProductParams, ProductResult } from "../interfaces/product.interface"

const PRODUCTS_ENDPOINT = "products"

class ProductService extends HttpRequest {
  public async getProducts(params: ProductParams) {
    this.configRequest({
      endpoint: PRODUCTS_ENDPOINT,
    })
    return this.getWithParams<ProductParams, ProductResult>(params)
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

export default ProductService
