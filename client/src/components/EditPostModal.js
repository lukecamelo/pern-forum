import React, { Component } from 'react'

import Modal from '../styled/Modal'
import Form from '../styled/Form'
import { Button } from '../styled/index'

import ReactMde, { DraftUtil } from 'react-mde'
import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import { editPostContent } from '../utils/threadHelpers'

class EditPostModal extends Component {
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

  componentDidMount = () => {
    // sort of an inelegant way of dealing with the fact
    // that mdeState === null on initialization
    setTimeout(() => {
      this.changeEditorText()
    }, 50)
  }

  handleValueChange = mdeState => {
    this.setState({ mdeState })
  }

  changeEditorText = () => {
    const { mdeState } = this.state
    const newDraftState = DraftUtil.buildNewDraftState(
      mdeState.draftEditorState,
      {
        selection: {
          start: 0,
          end: 0
        },
        text: this.props.postContent
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

  render() {
    return (
      <Modal>
        <Modal.Content>
          <h1 style={{ textAlign: 'center' }}>Fix your mistakes</h1>
          <Form.Markdown style={{ boxShadow: 'none' }}>
            <ReactMde
              layout={this.props.isMobile ? 'vertical' : 'tabbed'}
              style={{ textAlign: 'left' }}
              onChange={this.handleValueChange}
              editorState={this.state.mdeState}
              placeholder="make your changes"
              generateMarkdownPreview={markdown =>
                Promise.resolve(this.converter.makeHtml(markdown))
              }
            />
          </Form.Markdown>
          {/* TODO: get this button to refresh the page or otherwise react to being clicked on */}
          <div style={{ textAlign: 'center' }}>
            <Button
              onClick={() =>
                editPostContent(
                  this.props.threadId,
                  this.props.postId,
                  this.state.mdeState.html
                )
              }
            >
              Edit
            </Button>
            <Button onClick={this.props.toggleModal}>Cancel</Button>
          </div>
        </Modal.Content>
      </Modal>
    )
  }
}

export default EditPostModal
