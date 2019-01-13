import React, { useState } from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import { useWindowWidth } from '../utils/hooks'

function useMarkdownInput(initialValue) {
  const [value, setValue] = useState(initialValue)
  function handleChange(value) {
    setValue(value)
  }
  return {
    editorState: value,
    onChange: handleChange
  }
}

const MarkdownEditor = () => {
  this.converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true
  })

  const editorState = useMarkdownInput('')
  const width = useWindowWidth()
  let isMobile = width < 700 ? true : false

  return (
    <React.Fragment>
      <ReactMde
        layout={isMobile ? 'vertical' : 'tabbed'}
        style={{ textAlign: 'left' }}
        {...editorState}
        generateMarkdownPreview={markdown =>
          Promise.resolve(this.converter.makeHtml(markdown))
        }
      />
    </React.Fragment>
  )
}

export default MarkdownEditor
