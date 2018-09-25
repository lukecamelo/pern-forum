import { keyframes } from 'styled-components'

export const slideInLeft = keyframes`
  0% { transform: translateX(-25px); }
  100% { transform: translateX(0px); }
`
export const slideInRight = keyframes`
  0% { transform: translateX(25px); }
  100% { transform: translateX(0px); }
`
export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`