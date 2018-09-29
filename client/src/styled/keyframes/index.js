import { keyframes } from 'styled-components'

export const slideInLeft = keyframes`
  0% { transform: translateX(-35px); }
  100% { transform: translateX(0px); }
`
export const slideInRight = keyframes`
  0% { transform: translateX(35px); }
  100% { transform: translateX(0px); }
  `
  export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
  `
export const slideInBottom = keyframes`  
  0% { transform: translateY(35px); }
  100% { transform: translateY(0px); }
`
export const slideInTop = keyframes`  
  0% { transform: translateY(-35px); }
  100% { transform: translateY(0px); }
`