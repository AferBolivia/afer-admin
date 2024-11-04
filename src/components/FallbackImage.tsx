import { ReactNode, useState } from "react"

const FallbackImage = ({
  src,
  alt,
  className,
  children,
}: FallbackImageProps) => {
  const [hasError, setHasError] = useState(false)
  const handleError = () => {
    setHasError(true)
  }
  if (hasError) {
    return children
  }
  return <img src={src} className={className} alt={alt} onError={handleError} />
}

type FallbackImageProps = {
  src: string
  className: string
  alt: string
  children: ReactNode
}

export default FallbackImage
