import styled from 'styled-components'


const Controls = styled.div` 
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 1em;

  > p {
    margin-right: 1em;
    color: #0266c8;
    margin-bottom: 0;
  }
  
  @media screen and (max-width: 532px) {
    padding: 0 1em .5em 1em;
    justify-content: space-between;
  }
`

export default Controls