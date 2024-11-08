const QRCodeScannerIcon = ({
  color = "#fff",
  size = 24,
  className = "",
 }: QRCodeScannerIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 -960 960 960"
    className={className}
  >
    <path d="M80-680v-200h200v80H160v120H80zm0 600v-200h80v120h120v80H80zm600 0v-80h120v-120h80v200H680zm120-600v-120H680v-80h200v200h-80zM700-260h60v60h-60v-60zm0-120h60v60h-60v-60zm-60 60h60v60h-60v-60zm-60 60h60v60h-60v-60zm-60-60h60v60h-60v-60zm120-120h60v60h-60v-60zm-60 60h60v60h-60v-60zm-60-60h60v60h-60v-60zm240-320v240H520v-240h240zM440-440v240H200v-240h240zm0-320v240H200v-240h240zm-60 500v-120H260v120h120zm0-320v-120H260v120h120zm320 0v-120H580v120h120z"></path>
  </svg>
)

type QRCodeScannerIconProps = {
  color?: string
  size?: number,
  className?: string
}

export default QRCodeScannerIcon
