import React from 'react'
import Modal from '../styled/Modal'

import { Button } from '../styled/index'
import Form from '../styled/Form'

import ReactMde from 'react-mde'
import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import { editPostContent } from '../utils/threadHelpers'

class EditPostModal extends React.Component {
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

  handleValueChange = mdeState => {
    this.setState({ mdeState })
  }

  render() {
    return (
      <Modal>
        <Modal.Content>
          <h1>Fix your mistakes</h1>
          <Form.Markdown>
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
        </Modal.Content>
      </Modal>
    )
  }
}

export default EditPostModal
