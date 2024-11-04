import { useContext } from "react"

import { ViewContext, ViewContextType } from "@/common/contexts/view.context"

export const useView = (): ViewContextType => {
  const context = useContext(ViewContext)
  if (!context) {
    throw new Error("useView debe ser usado dentro de un ViewProvider")
  }
  return context
}
