import styled from 'styled-components'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1em 0 0;
  width: 100%;

    @media screen and (max-width: 532px) {
      padding-bottom: 0;
    }
`

export default Body