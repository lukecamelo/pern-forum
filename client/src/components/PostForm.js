import React, { Component } from 'react'
import { Container, Button } from '../styled/index'

import { connect } from 'react-redux'
import { makeNewPost } from '../actions/threadActions'
import styled from 'styled-components'

import Form from '../styled/Form'

import ReactMde from 'react-mde'
import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

const PostFormContainer = styled(Container)`
  margin-top: 2em;
  margin-bottom: 2em;
  margin-left: 4em;
  margin-right: 4em;
`

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      mdeState: null
    }
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true
    })
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleValueChange = mdeState => {
    this.setState({ mdeState })
  }

  handleSubmit = async () => {
    try {
      await this.props.makeNewPost(
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
    const style = {
      margin: '2em 4em 2em 4em',
      width: '100%',
      textAlign: 'center'
    }

    return (
      <PostFormContainer>
        <Form.Markdown>
          <ReactMde
            layout={'tabbed'}
            style={{ textAlign: 'left' }}
            onChange={this.handleValueChange}
            editorState={this.state.mdeState}
            generateMarkdownPreview={markdown =>
              Promise.resolve(this.converter.makeHtml(markdown))
            }
          />
        </Form.Markdown>
        <form onSubmit={this.handleSubmit}>
          <Button type="submit">Submit Post</Button>
        </form>
      </PostFormContainer>
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
