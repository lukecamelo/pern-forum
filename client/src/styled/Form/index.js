import styled from 'styled-components'

import Input from './Input'
import Markdown from './Markdown'

const Form = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 75vw;
  @media screen and (max-width: 700px) {
    width: 90vw;
  }
`

Form.Input = Input
Form.Markdown = Markdown

export default Form