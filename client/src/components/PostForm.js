import React, { Component } from 'react'
import { Container, FormWrapper, Button } from './Login'
import { ThreadContentInput } from './ThreadForm'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { makeNewPost } from '../actions/threadActions'
import styled from 'styled-components'

const PostFormContainer = styled(Container)`
  margin-top: 2em;
  margin-bottom: 2em;
`

class PostForm extends Component {
  state = {
    content: ''
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async () => {
    try {
      await this.props.makeNewPost(
        this.state.content,
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
        <form onSubmit={this.handleSubmit}>
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
        </form>
      </PostFormContainer>
    )
  }
}

export default connect(
  null,
  { makeNewPost }
)(PostForm)
