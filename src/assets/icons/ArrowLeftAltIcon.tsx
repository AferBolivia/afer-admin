const ArrowLeftAltIcon = ({
  color = "#fff",
  size = 24,
  className = "",
 }: ArrowLeftAltIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 -960 960 960"
    className={className}
  >
    <path d="M400-240L160-480l240-240 56 58-142 142h486v80H314l142 142-56 58z"></path>
  </svg>
)

type ArrowLeftAltIconProps = {
  color?: string
  size?: number,
  className?: string
}

export default ArrowLeftAltIcon
