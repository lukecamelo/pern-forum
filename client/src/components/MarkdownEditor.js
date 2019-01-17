import React, { useState, useEffect } from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { Button } from '../styled'
import Form from '../styled/Form'

import { useWindowWidth } from '../utils/hooks'
import { quotePostInEditor } from '../utils/markdownHelpers'

const MarkdownEditor = props => {
  const [markdown, setMarkdown] = useState('')
  // const [mdeState, setMdeState] = useState({})

  this.converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true
  })

  function useMarkdownInput() {
    console.log('useMarkdownInput firing')
    function handleChange(value) {
      setMarkdown(value)
    }
    return {
      editorState: markdown,
      onChange: handleChange
    }
  }

  function useQuotedPost() {
    function handleChange(value) {
      setMarkdown(value)
    }
    console.log(markdown)
    return {
      editorState: quotePostInEditor(props.quotedUser, props.quotedPost),
      onChange: handleChange
    }
  }

  // useEffect(
  //   () => {
  //     if (props.quotedPost.length > 0) {
  //       useQuotedPost()
  //     }
  //   },
  //   [props.quotedPost]
  // )

  function clearAndSubmit(content, username, userId, threadId) {
    props.submit(content, username, userId, threadId)
    setMarkdown('')
  }

  let editorState = useMarkdownInput()

  const width = useWindowWidth()
  let isMobile = width < 700 ? true : false

  return (
    <React.Fragment>
      <Form.Markdown>
        <ReactMde
          layout={isMobile ? 'vertical' : 'tabbed'}
          {...editorState}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
        />
      </Form.Markdown>
      <div
        style={{
          textAlign: 'center'
        }}
      >
        <Button
          style={{ marginBottom: '4em' }}
          onClick={() =>
            clearAndSubmit(
              editorState,
              props.username,
              props.userId,
              props.threadId
            )
          }
        >
          Submit Post
        </Button>
      </div>
    </React.Fragment>
  )
}

export default MarkdownEditor
