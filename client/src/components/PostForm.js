import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeNewPost } from '../actions/threadActions'
import { quotePostInEditor } from '../utils/markdownHelpers'

import Form from '../styled/Form'
import { Button, H1 } from '../styled/index'

import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import MarkdownEditor from './MarkdownEditor'

export class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mdeState: null,
      message: ''
    }
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true
    })
  }

  // componentDidUpdate = prevProps => {
  //   if (this.props.quotedPost !== prevProps.quotedPost) {
  //     this.changeEditorText(
  //       quotePostInEditor(this.props.quotedUser, this.props.quotedPost)
  //     )
  //   }
  // }

  handleValueChange = mdeState => {
    this.setState({ mdeState, message: '' })
  }

  // changeEditorText = (fn, editorState) => {
  //   const { mdeState } = this.state
  //   console.log('changeEditorText editorState: ', editorState)
  //   const newDraftState = DraftUtil.buildNewDraftState(
  //     editorState.editorState.draftEditorState,
  //     {
  //       selection: {
  //         start: 0,
  //         end: 0
  //       },
  //       text: fn
  //     }
  //   )
  //   // this.setState({
  //   //   mdeState: {
  //   //     markdown: editorState.markdown,
  //   //     html: editorState.html,
  //   //     draftEditorState: newDraftState
  //   //   }
  //   // })
  // }

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
      // this.changeEditorText('', content)
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
