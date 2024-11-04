import { ITabNavigationItem } from "../interfaces/tab-navigator.interface"

import { TAB_NAVIGATION_STATUS } from "@/enums/tab-navigation.enum"

export const formattedTabItemsFromIndex = (
  indexActive: number,
  tabs: ITabNavigationItem[],
): ITabNavigationItem[] => {
  const formattedTabs: ITabNavigationItem[] = tabs.map((tab, indexTab) => {
    if (indexTab <= indexActive) {
      return {
        ...tab,
        active: indexTab === indexActive,
      }
    }
    return {
      ...tab,
      active: false,
    }
  })
  return formattedTabs
}

export const completedtoIndex = (
  indexActive: number,
  tabs: ITabNavigationItem[],
): ITabNavigationItem[] => {
  const formattedTabs: ITabNavigationItem[] = tabs.map((tab, indexTab) => {
    if (indexTab <= indexActive) {
      const currentStatus =
        tab.status === TAB_NAVIGATION_STATUS.COMPLETE
          ? TAB_NAVIGATION_STATUS.COMPLETE
          : TAB_NAVIGATION_STATUS.HOLD
      return {
        ...tab,
        status: indexTab === indexActive ? currentStatus : TAB_NAVIGATION_STATUS.COMPLETE,
        active: indexTab === indexActive,
      }
    }
    return {
      ...tab,
      active: false,
    }
  })
  return formattedTabs
}
