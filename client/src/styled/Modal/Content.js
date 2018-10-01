import styled from 'styled-components'

const Content = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;
  right: 100px;
  border: 1px solid #ccc;
  background: #fff;
  overflow: auto;
  WebkitOverflowScrolling: touch;
  borderRadius: 4px;
  outline: none;
  padding: 20px;

    @media screen and (max-width: 532px) {
      top: 40px;
      left: 40px;
      right: 40px;
    }
`

export default Content