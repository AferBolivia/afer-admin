import { ReactElement, ReactNode, cloneElement } from "react"

import { useTabNavigationContext } from "@/common/hooks/tab-context-manager.hook"

export const TabNavigatorViewer = ({ children = [] }: TabNavigatorViewerProps) => {
  const { tabNavigationData } = useTabNavigationContext()
  const findElementById = (indexElement: number) => {
    return children.find((_: ReactNode, index: number) => index === indexElement)
  }
  const renderTab = (indexElement: number) => {
    const elem = findElementById(indexElement) as ReactElement
    return cloneElement(elem, { index: indexElement })
  }
  return <>{renderTab(tabNavigationData.index)}</>
}

type TabNavigatorViewerProps = {
  children?: ReactNode[]
}
