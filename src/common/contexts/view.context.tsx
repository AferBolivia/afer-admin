import React, { createContext, useState, ReactNode } from "react"


import { VIEW_TYPE } from "../enums/view.enum"

import { getViewLocal, setViewLocal } from "@/common/helpers/view-verify-local"

export interface ViewContextType {
  view: VIEW_TYPE
  setView: (view: VIEW_TYPE) => void
}
export const ViewContext = createContext<ViewContextType | undefined>(undefined)

interface ViewProviderProps {
  children: ReactNode
}

export const ViewProvider: React.FC<ViewProviderProps> = ({ children }) => {
  const [view, setViewState] = useState<VIEW_TYPE>(getViewLocal() || VIEW_TYPE.TABLE)

  const setView = (view: VIEW_TYPE) => {
    setViewLocal(view)
    setViewState(view)
  }

  return <ViewContext.Provider value={{ view, setView }}>{children}</ViewContext.Provider>
}
