import React from 'react'
import styled, { keyframes } from 'styled-components'
import './Loader.css'

const rotation = keyframes`
  100% { transform: rotate(360deg) }
`
const Spinning = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  animation: 2s ${rotation};
  color: ${props => props.theme.primary};
`

const Loader = () => {
  return (
    <div>
      {/* <Spinning className="fas fa-spinner fa-7x" /> */}
      <div className="loader">Loading...</div>
    </div>
  )
}

export default Loader
