import { useContext } from "react"

import { ITabNavigationItem } from "../interfaces/tab-navigator.interface"

import { TabNavigationContext } from "@/common/contexts/tab-context"
import {
  completedtoIndex,
  formattedTabItemsFromIndex,
} from "@/common/helpers/tab-navigation.helper"


export const useTabNavigationContext = () => {
  const context = useContext(TabNavigationContext)

  if (context === undefined) {
    throw new Error("useTabNavigationContext must be used within a TabNavigation")
  }

  return context
}

export const useTabNavigationContextManager = () => {
  const { setTabNavigationData, setTabNavigationIndex, tabNavigationData } =
    useTabNavigationContext()

  const tabNextStep = () => {
    const nextIndex = +tabNavigationData.index + 1
    if (nextIndex < tabNavigationData.tabs.length) {
      const nextUserTabs = formattedTabItemsFromIndex(nextIndex, tabNavigationData.tabs)
      setTabNavigationData({
        index: nextIndex,
        tabs: nextUserTabs,
      })
    }
  }

  const tabBackStep = () => {
    const backIndex = +tabNavigationData.index - 1
    if (backIndex >= 0) {
      setTabNavigationIndex(backIndex)
    }
  }

  const tabComplete = (index: number) => {
    const nextIndex = +index + 1
    if (nextIndex >= 0 && nextIndex < tabNavigationData.tabs.length) {
      const updateUserTabs = completedtoIndex(nextIndex, tabNavigationData.tabs)
      setTabNavigationData({
        ...tabNavigationData,
        index: nextIndex,
        tabs: updateUserTabs,
      })
    }
  }

  const tabIndex = (index: number) => {
    if (index >= 0 && index < tabNavigationData.tabs.length) {
      setTabNavigationIndex(index)
    }
  }

  const tabStart = (index: number, tabs: ITabNavigationItem[]) => {
    const currentUserTabs = formattedTabItemsFromIndex(index, tabs)
    setTabNavigationData({
      index: index,
      tabs: currentUserTabs,
    })
  }

  return {
    tabNextStep,
    tabBackStep,
    tabComplete,
    tabIndex,
    tabStart,
  }
}
