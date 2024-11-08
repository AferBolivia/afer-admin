import { useContext } from "react"

import { MenuContext } from "@/common/contexts/menu.context"

const useMenu = () => {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider")
  }
  return context
}

export default useMenu
