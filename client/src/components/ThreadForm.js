import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postNewThread, fetchThreads } from '../actions/threadActions'
import { Container, FormWrapper, Input } from './Login'
import styled from 'styled-components'
import NavBar from './NavBar'
import ReactMde, { ReactMdeTypes } from 'react-mde'
import Showdown from 'showdown'
import './NavBar.css'
import 'react-mde/lib/styles/css/react-mde-all.css'

export const ThreadContentInput = styled.textarea`
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
const ThreadFormWrapper = styled(FormWrapper)`
  width: 75%;
`
const ThreadTitleInput = styled(Input)`
  width: 250px;
`

class ThreadForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      mdeState: null
    }
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true
    })
  }

  componentDidMount = () => {
    this.props.fetchThreads()
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleValueChange = mdeState => {
    this.setState({ mdeState })
  }
  render() {
    return (
      <Container>
        <NavBar />
        <h1>Post new thread</h1>
        <ThreadFormWrapper>
          <Input
            name="title"
            value={this.state.title}
            onChange={this.changeHandler}
            placeholder="thread title"
          />
          {/* <ThreadContentInput
            name="content"
            value={this.state.content}
            onChange={this.changeHandler}
            cols="10"
            rows="10"
            placeholder="thread content"
          /> */}
            <ReactMde
              layout={'tabbed'}
              style={{textAlign: 'left'}}
              onChange={this.handleValueChange}
              editorState={this.state.mdeState}
              generateMarkdownPreview={markdown =>
                Promise.resolve(this.converter.makeHtml(markdown))
              }
            />
          <Link
            to="/"
            className="logout"
            onClick={() =>
              this.props.postNewThread(
                this.state.title,
                this.state.content,
                this.props.loggedInUserId,
                this.props.username
              )
            }
          >
            Submit Thread
          </Link>

        </ThreadFormWrapper>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  users: state.threadData.users,
  loggedInUserId: state.auth.userId,
  username: state.auth.username
})

export default connect(
  mapStateToProps,
  { postNewThread, fetchThreads }
)(ThreadForm)
