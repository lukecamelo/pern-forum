import styled from 'styled-components'
import { slideInLeft } from '../keyframes/index'

const User = styled.div`
  display: flex;
  margin-right: 1em;
  padding: 0 2em 2em 2em;
  background-color: #f9f9f9;
  animation: ${slideInLeft} 0.4s cubic-bezier(0.28, 1, 0.14, 0.99);
  flex-direction: column;

    p {
      margin: 0;
    }

    @media screen and (max-width: 532px) {
      margin-right: 0;
      flex-direction: row-reverse;
      justify-content: flex-end;
      justify-self: center;
    }

`

export default User