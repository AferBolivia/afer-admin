import { useContext } from "react"

import { AuthContext, AuthContextType } from "@/common/contexts/auth.context"

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un UserProvider")
  }
  return context
}
