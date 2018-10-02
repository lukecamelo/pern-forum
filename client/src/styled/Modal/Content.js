import styled from 'styled-components'

const Content = styled.div`
  position: absolute;
  top: 100px;
  left: 200px;
  right: 200px;
  border: 1px solid #ccc;
  background: #fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  outline: none;
  padding: 20px;
  box-shadow: ${props => props.theme.largeShadow}

    @media screen and (max-width: 900px) {
      left: 100px;
      right: 100px;
    }

    @media screen and (max-width: 532px) {
      top: 40px;
      left: 40px;
      right: 40px;
    }
`

export default Content