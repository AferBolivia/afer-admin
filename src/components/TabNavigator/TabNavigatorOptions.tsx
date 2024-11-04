import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import { Button } from "keep-react"

import TabNavigationItem from "./TabNavigationItem"

import { scrollTop } from "@/common/helpers/scroll-top.helper"
import { useTabNavigationContextManager } from "@/common/hooks/tab-context-manager.hook"
import { ITabNavigationItem } from "@/common/interfaces/tab-navigator.interface"


export const TabNavigatorOptions = ({ tabItems }: TabNavigatorOptionsProps) => {
  const { tabIndex, tabNextStep, tabBackStep } = useTabNavigationContextManager()

  const handleTabIndex = (index: number) => {
    tabIndex(index)
    scrollTop(700)
  }

  return (
    <div className="w-full flex gap-2 justify-center items-start">
      <div className="flex justify-center items-center flex-shrink-0 w-12 h-10">
        <Button shape="icon" onClick={tabBackStep}>
          <CaretLeft size={20} />
        </Button>
      </div>
      <div className="flex flex-row gap-4 w-full overflow-x-scroll pb-2">
        {tabItems.map((item: ITabNavigationItem, index: number) => (
          <TabNavigationItem
            key={`tab-${index}`}
            onClick={(): void => {
              handleTabIndex(index)
            }}
            itemData={{
              ...item,
              index: index + 1,
            }}
          />
        ))}
      </div>
      <div className="flex justify-center items-center flex-shrink-0 w-12 h-10">
        <Button shape="icon" onClick={tabNextStep}>
          <CaretRight size={20} />
        </Button>
      </div>
    </div>
  )
}

type TabNavigatorOptionsProps = {
  tabItems: ITabNavigationItem[]
}
