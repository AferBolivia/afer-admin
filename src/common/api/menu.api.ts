import { MenuPayload } from "@/common/interfaces/menu.interface"
import MenuService from "@/common/services/menu.service"

const menuService = new MenuService()

export const getMenus = async () => {
  const response = await menuService.getMenus()
  return response.data
}

export const getMenuById = async (id: number) => {
  const response = await menuService.getMenuById(id)
  return response.data
}

export const createMenu = async (data: MenuPayload) => {
  const response = await menuService.createMenu(data)
  return response.data
}
