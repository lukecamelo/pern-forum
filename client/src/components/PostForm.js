import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeNewPost } from '../actions/threadActions'

import Form from '../styled/Form'
import { H1 } from '../styled/index'

import MarkdownEditor from './MarkdownEditor'

export class PostForm extends Component {
  state = {
    message: ''
  }

  submitAndClearEditor = async (content, username, userId, threadId) => {
    // prevent people from typing weird html strings to bypass empty post filter
    let span = document.createElement('span')
    span.innerHTML = content.editorState.html
    if (span.textContent !== '') {
      await this.props.submit(
        content.editorState.html,
        username,
        userId,
        threadId
      )
    } else {
      this.setState({
        message: 'posts cannot be blank!'
      })
    }
  }

  render() {
    if (this.props.auth.isLoggedIn) {
      return (
        <Form>
          <H1 style={{ margin: '0' }}>{this.state.message}</H1>
          <MarkdownEditor
            submit={this.submitAndClearEditor}
            username={this.props.auth.username}
            userId={this.props.auth.userId}
            threadId={this.props.threadId}
            quotedPost={this.props.quotedPost}
            quotedUser={this.props.quotedUser}
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
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { makeNewPost }
)(PostForm)
