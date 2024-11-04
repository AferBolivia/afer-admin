export interface UserBase {
  id: number
  name: string
  email: string
  status: boolean
  role: "ADMIN" | "CAJERO" | "COCINA" | "NONE"
  created_at: Date
  updated_at: Date
}
