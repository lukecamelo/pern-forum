import styled from 'styled-components'

import Input from './Input'
import Markdown from './Markdown'

const Form = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

Form.Input = Input
Form.Markdown = Markdown

export default Form