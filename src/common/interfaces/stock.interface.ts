export interface StockResponse {
  id: number
  name: string
  quantity: number
  left: number
  id_menu: number
  created_at: string
  updated_at: string
}

export interface StockPayload {
  name: string
  quantity: number
  id_menu: number
}
