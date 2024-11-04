import { SquaresFour, Table } from "@phosphor-icons/react"
import cn from "classnames"

import { VIEW_TYPE } from "@/common/enums/view.enum"
import { useView } from "@/common/hooks/view.hook"


const SwitchView = () => {
  const { view, setView } = useView()
  return (
    <div className="relative w-20 h-10 flex justify-center items-center bg-afer-100 dark:bg-afer-600 rounded-full p-2 cursor-pointer">
      <div
        className={cn("flex justify-center items-center w-8 h-8 rounded-xl", {
          "bg-afer-400 dark:bg-afer-950 text-white dark:text-afer-100":
            view === VIEW_TYPE.TABLE,
        })}
        onClick={() => setView(VIEW_TYPE.TABLE)}
      >
        <Table className="w-6 h-6" />
      </div>
      <div
        className={cn("flex justify-center items-center w-8 h-8 rounded-xl", {
          "bg-afer-400 dark:bg-afer-950 text-white dark:text-afer-100":
            view === VIEW_TYPE.CARD,
        })}
        onClick={() => setView(VIEW_TYPE.CARD)}
      >
        <SquaresFour className="w-6 h-6" />
      </div>
    </div>
  )
}

export default SwitchView
