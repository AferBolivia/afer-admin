import { createContext, Dispatch, SetStateAction, useState, ReactNode } from "react"

import { ITabNavigationItem } from "@/common/interfaces/tab-navigator.interface"

export interface ITabNavigation {
  index: number
  tabs: ITabNavigationItem[]
}

export interface ContextProps {
  tabNavigationData: ITabNavigation
  setTabNavigationData: Dispatch<SetStateAction<ITabNavigation>>
  setTabNavigationIndex: (index: number) => void
}

export const TabNavigationContext = createContext<ContextProps>({
  tabNavigationData: { index: 0, tabs: [] },
  setTabNavigationData: () => {},
  setTabNavigationIndex: () => {},
})

export const TabNavigationContextProvider = ({ children }: TabNavigationContextProps) => {
  const [tabNavigationData, setTabNavigationData] = useState<ITabNavigation>({
    index: 0,
    tabs: [],
  })

  const setTabNavigationIndex = (index: number) => {
    const updateTabs = updateTabActive(index)
    setTabNavigationData({
      index,
      tabs: updateTabs,
    })
  }

  const updateTabActive = (indexActive: number): ITabNavigationItem[] => {
    const updateTabs = tabNavigationData.tabs.map((tab, indexTab) => {
      return {
        ...tab,
        active: indexTab === indexActive,
      }
    })
    return updateTabs
  }

  return (
    <TabNavigationContext.Provider
      value={{
        tabNavigationData,
        setTabNavigationData,
        setTabNavigationIndex,
      }}
    >
      {children}
    </TabNavigationContext.Provider>
  )
}

type TabNavigationContextProps = {
  children: ReactNode
}
