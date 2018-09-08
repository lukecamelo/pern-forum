import React, { Component } from 'react'
import { Container, FormWrapper, Button } from './Login'
import { ThreadContentInput } from './ThreadForm'

import { connect } from 'react-redux'
import { makeNewPost } from '../actions/threadActions'
import styled from 'styled-components'

import ReactMde, { ReactMdeTypes } from 'react-mde'
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
        localStorage.User,
        localStorage.UserId,
        this.props.threadId
      )
    } catch (e) {
      alert(e.message)
    }
  }

  render() {
    return (
      <PostFormContainer>
        {/* <form onSubmit={this.handleSubmit}>
          <FormWrapper>
            <ThreadContentInput
              name="content"
              value={this.state.content}
              onChange={this.changeHandler}
              cols="10"
              rows="10"
              placeholder="post content"
            />
            <Button type="submit">Submit Post</Button>
          </FormWrapper>
        </form> */}
        <form onSubmit={this.handleSubmit}>
          <ReactMde
            layout={'tabbed'}
            style={{ textAlign: 'left' }}
            onChange={this.handleValueChange}
            editorState={this.state.mdeState}
            generateMarkdownPreview={markdown =>
              Promise.resolve(this.converter.makeHtml(markdown))
            }
          />
          <Button type='submit'>Submit Post</Button>
        </form>
      </PostFormContainer>
    )
  }
}

export default connect(
  null,
  { makeNewPost }
)(PostForm)
