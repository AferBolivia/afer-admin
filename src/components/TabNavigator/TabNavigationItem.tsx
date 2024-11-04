import { useEffect, useRef } from "react"

import { Check } from "@phosphor-icons/react"
import cn from "classnames"
import { useWindowSize } from "usehooks-ts"

import { TAB_NAVIGATION_STATUS } from "@/enums/tab-navigation.enum"
import { scrollElement } from "@/common/helpers/scroll-element"
import { ITabNavigationItem } from "@/common/interfaces/tab-navigator.interface"

const TabNavigationItem = ({ itemData, onClick }: TabNavigationItemProps) => {
  const itemRef = useRef(null)
  const { width: widthScreen } = useWindowSize()

  const scrollPosition = () => {
    if (itemRef) {
      const currentRef = itemRef.current as unknown as HTMLElement
      const parentRef = currentRef.parentElement
      if (parentRef) {
        if (currentRef.offsetLeft + currentRef.offsetWidth > parentRef.offsetWidth) {
          scrollElement(parentRef, 700, currentRef.offsetLeft - 56)
        } else {
          scrollElement(parentRef, 700, 0)
        }
      }
    }
  }

  useEffect(() => {
    if (itemData.active) {
      scrollPosition()
    }
  }, [itemData.active])

  useEffect(() => {
    if (itemData.active) {
      scrollPosition()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widthScreen])

  return (
    <div
      ref={itemRef}
      className={cn(
        "flex justify-start items-center gap-3 w-full px-4 py-2 select-none rounded-xl cursor-pointer text-sy-brand-950 font-medium",
        itemData.active
          ? "bg-[#042bb2] text-white"
          : "bg-primary-25 text-black dark:text-white dark:bg-transparent",
      )}
      onClick={onClick}
      style={{
        pointerEvents: `${itemData.status === TAB_NAVIGATION_STATUS.BLOCKED ? "none" : "auto"}`,
        opacity: `${itemData.status === TAB_NAVIGATION_STATUS.BLOCKED ? "0.5" : "1"}`,
      }}
    >
      <div className="flex justify-center items-center rounded-full w-6 h-6 bg-transparent">
        <>
          {itemData.status === TAB_NAVIGATION_STATUS.COMPLETE ? (
            <Check size={16} weight="bold" />
          ) : (
            <span>{itemData.index}</span>
          )}
        </>
      </div>
      <span className="whitespace-nowrap">{itemData.title}</span>
    </div>
  )
}

interface TabItemData extends ITabNavigationItem {
  index: number
}
type TabNavigationItemProps = {
  itemData: TabItemData
  onClick: () => void
}

export default TabNavigationItem
