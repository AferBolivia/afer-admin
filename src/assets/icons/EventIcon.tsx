const EventIcon = ({
  color = "#fff",
  size = 24,
  className = "",
 }: EventIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 -960 960 960"
    className={className}
  >
    <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29zM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200zm0-80h560v-400H200v400zm0-480h560v-80H200v80zm0 0v-80 80z"></path>
  </svg>
)

type EventIconProps = {
  color?: string
  size?: number,
  className?: string
}

export default EventIcon
