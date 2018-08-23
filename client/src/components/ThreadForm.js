import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNewThread, fetchThreads } from '../actions/threadActions'
import { Container, FormWrapper, Input, Button } from './Login'
import styled from 'styled-components'
import NavBar from './NavBar'

const ThreadContentInput = styled.textarea`
  background: ${props => props.theme.primary};
  border-radius: 3px;
  border: none;
  color: white;
  padding: 10px 1em;
  margin-bottom: 5px;
  width: 100%;
  font-size: 18px;

  &::placeholder {
    color: white;
  }
`

class ThreadForm extends Component {
  state = {
    title: '',
    content: ''
  }

  componentDidMount = () => {
    this.props.fetchThreads()
    console.log(localStorage.UserId)
  }
  
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Container>
        <NavBar />
        <h1>Post new thread</h1>
        <FormWrapper>
          <Input
            name="title"
            value={this.state.title}
            onChange={this.changeHandler}
            placeholder="thread title"
          />
          <ThreadContentInput
            name="content"
            value={this.state.content}
            onChange={this.changeHandler}
            cols="10"
            rows="10"
            placeholder="thread content"
          />
          <Button
            onClick={() =>
              this.props.postNewThread(
                this.state.title,
                this.state.content,
                this.props.loggedInUserId
              )
            }
          >
            Submit Thread
          </Button>
        </FormWrapper>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  users: state.threadData.users,
  loggedInUserId: state.auth.userId
})

export default connect(
  mapStateToProps,
  { postNewThread, fetchThreads }
)(ThreadForm)