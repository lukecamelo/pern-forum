import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeNewPost } from '../actions/threadActions'

import Form from '../styled/Form'
import { H1 } from '../styled/index'

import MarkdownEditor from './MarkdownEditor'

export const PostForm = props => {
  const [message, setMessage] = useState('')

  const submit = async (content, username, userId, threadId) => {
    // prevent people from typing weird html strings to bypass empty post filter
    let span = document.createElement('span')
    span.innerHTML = content.editorState.html
    if (span.textContent !== '') {
      setMessage('')
      await props.submit(content.editorState.html, username, userId, threadId)
    } else {
      setMessage('Posts cannot be blank!')
    }
  }

  if (props.auth.isLoggedIn) {
    return (
      <Form>
        <H1 style={{ margin: '0' }}>{message}</H1>
        <MarkdownEditor
          submit={submit}
          username={props.auth.username}
          userId={props.auth.userId}
          threadId={props.threadId}
          quotedPost={props.quotedPost}
          quotedUser={props.quotedUser}
          message={message}
          setMessage={setMessage}
        />
      </Form>
    )
  } else {
    return (
      <div style={{ textAlign: 'center', marginTop: '0' }}>
        <H1 style={{ marginBottom: '1em' }}>Log in to make posts.</H1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { makeNewPost }
)(PostForm)
