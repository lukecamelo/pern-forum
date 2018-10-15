import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeNewPost } from '../actions/threadActions'
import { quotePostInEditor, clearEditor } from '../utils/markdownHelpers'

import Form from '../styled/Form'
import { Button, H1 } from '../styled/index'

import ReactMde, { DraftUtil } from 'react-mde'
import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

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

  componentDidUpdate = nextProps => {
    if (this.props.quotedPost !== nextProps.quotedPost) {
      this.changeEditorText(
        quotePostInEditor(this.props.quotedUser, this.props.quotedPost)
      )
    }
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleValueChange = mdeState => {
    this.setState({ mdeState, message: '' })
  }

  changeEditorText = fn => {
    const { mdeState } = this.state
    const newDraftState = DraftUtil.buildNewDraftState(
      mdeState.draftEditorState,
      {
        selection: {
          start: 0,
          end: 0
        },
        text: fn
      }
    )
    this.setState({
      mdeState: {
        markdown: mdeState.markdown,
        html: mdeState.html,
        draftEditorState: newDraftState
      }
    })
  }

  submitAndClearEditor = async (content, username, userId, threadId) => {
    if (this.state.mdeState.html !== '') {
      await this.props.submit(content, username, userId, threadId)
      this.changeEditorText(clearEditor())
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
          <Form.Markdown>
            <ReactMde
              layout={this.props.isMobile ? 'vertical' : 'tabbed'}
              style={{ textAlign: 'left' }}
              onChange={this.handleValueChange}
              editorState={this.state.mdeState}
              generateMarkdownPreview={markdown =>
                Promise.resolve(this.converter.makeHtml(markdown))
              }
            />
          </Form.Markdown>
          <div style={{ textAlign: 'center' }}>
            <Button
              style={{ marginBottom: '4em' }}
              onClick={() =>
                this.submitAndClearEditor(
                  this.state.mdeState.html,
                  this.props.auth.username,
                  this.props.auth.userId,
                  this.props.threadId
                )
              }
            >
              Submit Post
            </Button>
          </div>
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
