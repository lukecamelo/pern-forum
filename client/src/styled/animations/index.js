import styled from 'styled-components'
import * as keyframes from '../keyframes'

export const FadeIn = styled.div`
  animation: 1s ${keyframes.fadeIn} cubic-bezier(0.52, 0.79, 0.3, 0.98);
`
export const SlideLeft = styled.div`
  animation: 0.8s ${keyframes.slideInLeft} cubic-bezier(0.28, 1, 0.14, 0.99);
`
export const SlideRight = styled.div`
  animation: 0.8s ${keyframes.slideInRight} cubic-bezier(0.28, 1, 0.14, 0.99);
`
export const SlideBottom = styled.div`
  animation: 0.8s ${keyframes.slideInBottom} cubic-bezier(0.28, 1, 0.14, 0.99);
`
export const SlideTop = styled.div`
  animation: 0.8s ${keyframes.slideInTop} cubic-bezier(0.28, 1, 0.14, 0.99);
`