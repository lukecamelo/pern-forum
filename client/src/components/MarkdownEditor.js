import React, { useState, useEffect } from 'react'
import ReactMde, { DraftUtil } from 'react-mde'
import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { Button } from '../styled'
import Form from '../styled/Form'

import { useWindowWidth } from '../utils/hooks'
import { quotePostInEditor } from '../utils/markdownHelpers'

const MarkdownEditor = props => {
  const [markdown, setMarkdown] = useState('')
  let editorState

  this.converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true
  })

  const changeEditorText = (fn, editorState) => {
    const newDraftState = DraftUtil.buildNewDraftState(
      editorState.draftEditorState,
      {
        selection: {
          start: 0,
          end: 0
        },
        text: fn
      }
    )

    setMarkdown({
      markdown: editorState.markdown,
      html: editorState.html,
      draftEditorState: newDraftState
    })
  }

  function useMarkdownInput() {
    function handleChange(value) {
      if (props.message === 'Posts cannot be blank!') {
        props.setMessage('')
      }
      setMarkdown(value)
    }
    return {
      editorState: markdown,
      onChange: handleChange
    }
  }

  useEffect(
    () => {
      if (props.quotedPost.length > 0) {
        changeEditorText(
          quotePostInEditor(props.quotedUser, props.quotedPost),
          markdown
        )
      }
    },
    [props.quotedPost]
  )

  function clearAndSubmit(content, username, userId, threadId) {
    if (content.editorState.html.length > 0) {
      props.submit(content, username, userId, threadId)
      setMarkdown('')
    } else {
      props.setMessage('Posts cannot be blank!')
    }
  }

  editorState = useMarkdownInput()

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
