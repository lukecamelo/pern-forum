import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeNewPost } from '../actions/threadActions'
// import { makeNewPost } from '../utils/threadHelpers'

import Form from '../styled/Form'
import { Button } from '../styled/index'

import ReactMde, { DraftUtil } from 'react-mde'
import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

export class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mdeState: null
    }
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true
    })
  }

  componentDidUpdate = nextProps => {
    if (this.props.quotedPost !== nextProps.quotedPost) {
      this.changeEditorText()
    }
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleValueChange = mdeState => {
    this.setState({ mdeState })
  }

  // TODO: make this less specific and reusable
  changeEditorText = () => {
    const { mdeState } = this.state
    const newDraftState = DraftUtil.buildNewDraftState(
      mdeState.draftEditorState,
      {
        selection: {
          start: 0,
          end: 0
        },
        text:
          '<blockquote>' +
          this.props.quotedUser +
          ' said \n' +
          this.props.quotedPost +
          '</blockquote>'
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

  handleSubmit = () => {
    try {
      this.props.makeNewPost(
        this.state.mdeState.html,
        this.props.auth.username,
        this.props.auth.userId,
        this.props.threadId
      )
    } catch (e) {
      alert(e.message)
    }
  }

  render() {
    return (
      <Form style={{ margin: '2em', display: 'block' }}>
        <Form.Markdown>
          <ReactMde
            layout={this.props.isMobile ? 'vertical' : 'tabbed'}
            style={{ textAlign: 'left' }}
            onChange={this.handleValueChange}
            editorState={this.state.mdeState}
            placeholder="make a new post!"
            generateMarkdownPreview={markdown =>
              Promise.resolve(this.converter.makeHtml(markdown))
            }
          />
        </Form.Markdown>
        <form onSubmit={this.handleSubmit}>
          <Button type="submit">Submit Post</Button>
        </form>
      </Form>
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
