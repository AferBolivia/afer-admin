import { useEffect, useRef } from "react"

import CircleType from "circletype"
import cn from "classnames"

const CircleText = ({className = "", text = ""}: CircleTypeProps) => {
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (textRef.current) {
      new CircleType(textRef.current)
    }
  }, [])

  return (
    <div ref={textRef} className={cn(
      "font-medium",
      className
    )}>
      {text}
    </div>
  )
}

type CircleTypeProps = {
  className?: string
  text?: string
}
export default CircleText
