import styled from 'styled-components'
import { H1 } from '..';

const Title = styled(H1)`
  margin: 0;
  color: white;
  display: inline;
  fontSize: 2em;
`

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
`

Navigation.Title = Title

export default Navigation