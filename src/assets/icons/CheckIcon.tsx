const CheckIcon = ({
  color = "#fff",
  size = 24,
  className = "",
 }: CheckIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 -960 960 960"
    className={className}
  >
    <path d="M382-240L154-468l57-57 171 171 367-367 57 57-424 424z"></path>
  </svg>
)

type CheckIconProps = {
  color?: string
  size?: number,
  className?: string
}

export default CheckIcon
