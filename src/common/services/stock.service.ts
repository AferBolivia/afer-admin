import HttpRequest from "./http.service"

import { MenuPayload, MenuResponse } from "@/common/interfaces/menu.interface"
import { ResponseGeneric } from "@/common/interfaces/response.interface"

const STOCK_ENDPOINT = "stocks"

class MenuService extends HttpRequest {
  public async getStocks() {
    this.configRequest({
      endpoint: STOCK_ENDPOINT,
    })
    return this.get<ResponseGeneric<MenuResponse[]>>()
  }

  public async getMenuById(id: number) {
    this.configRequest({
      endpoint: `${STOCK_ENDPOINT}/${id}`,
    })
    return this.get<MenuResponse>()
  }

  public async createMenu(data: MenuPayload) {
    this.configRequest({
      endpoint: STOCK_ENDPOINT,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return this.post<MenuPayload, MenuResponse>(data)
  }
}

export default MenuService
