import { ReactNode } from "react"

import cn from "classnames"

const Header = ({ children, className = "" }: HeaderProps) => {
  return (
    <div
      className={cn(
        "w-full px-4 md:px-8 py-8 md:py-10 bg-afer-100 dark:bg-afer-600",
        "font-dmSans",
        className,
      )}
    >
      {children}
    </div>
  )
}

type HeaderProps = {
  children: ReactNode
  className?: string
}

export default Header
