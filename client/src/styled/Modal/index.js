import styled from 'styled-components'
import Content from './Content'
import { fadeIn } from '../keyframes/index'

const Modal = styled.main`
  z-index: 2000000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(40, 40, 40, 0.5);
  animation: .2s ${fadeIn} ease-out;
`

Modal.Content = Content

export default Modal