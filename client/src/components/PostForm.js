import React, { Component } from 'react'
import { Container, FormWrapper, Input, Button } from './Login'
import { ThreadContentInput } from './ThreadForm'

import { connect } from 'react-redux'
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

  render() {
    return (
      <PostFormContainer>
        <FormWrapper>
          <ThreadContentInput
            name="content"
            value={this.state.content}
            onChange={this.changeHandler}
            cols="10"
            rows="10"
            placeholder="post content"
          />
          <Button
            onClick={() =>
              this.props.makeNewPost(
                this.state.content,
                localStorage.User,
                localStorage.UserId,
                this.props.threadId
              )
            }
          >
            Submit Post
          </Button>
        </FormWrapper>
      </PostFormContainer>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.username
})

export default connect(
  null,
  { makeNewPost }
)(PostForm)
