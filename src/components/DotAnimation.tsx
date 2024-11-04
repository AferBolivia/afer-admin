import styled, { keyframes } from "styled-components"
const dotsAnimationFrames = keyframes`
 30% { opacity: 1 }
 40% { opacity: 0.3; }
 100% { opacity: 0.6; }
`
export const DotAnimation = styled.span<{ $delay: string }>`
  opacity: 0;
  animation: ${dotsAnimationFrames} 1.5s infinite;
  animation-delay: ${(props) => props.$delay}!important;
`
