const ArrowForwardIcon = ({
  color = "#fff",
  size = 24,
  className = "",
 }: ArrowForwardIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 -960 960 960"
    className={className}
  >
    <path d="M321-80l-71-71 329-329-329-329 71-71 400 400L321-80z"></path>
  </svg>
)

type ArrowForwardIconProps = {
  color?: string
  size?: number,
  className?: string
}

export default ArrowForwardIcon
