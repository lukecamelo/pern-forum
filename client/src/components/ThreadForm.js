import React, { Component } from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'
import styled from 'styled-components'
import 'react-mde/lib/styles/css/react-mde-all.css'

import { connect } from 'react-redux'
import { postNewThread, fetchThreads } from '../actions/threadActions'

import NavBar from './NavBar'
import './NavBar.css'
import Form from '../styled/Form'
import { Card } from './UserControlPanel'
import { Container, StyledLink, H1 } from '../styled/index'
import {
  FadeIn,
  SlideLeft,
  SlideRight,
  SlideBottom
} from '../styled/animations'

const ThreadFormCard = styled(Card)`
  margin: 2em auto 0 auto;
  width: 50vw;
  @media screen and (max-width: 700px) {
    width: 90vw;
  }
`

export class ThreadForm extends Component {
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

  handleSubmit = async e => {
    e.preventDefault()
    try {
      await this.props.postNewThread(
        this.state.title,
        this.state.mdeState.html,
        this.props.loggedInUserId,
        this.props.username
      )
      this.props.history.push('/threads/1')
    } catch (e) {
      alert(e.message)
    }
  }

  render() {
    return (
      <Container>
        <NavBar />
        <ThreadFormCard>
          <H1>Post new thread</H1>
          <Form style={{ margin: '0 1em', width: 'auto' }}>
            <FadeIn>
              <SlideLeft>
                <Form.Input
                  name="title"
                  value={this.state.title}
                  onChange={this.changeHandler}
                  placeholder="thread title"
                />
              </SlideLeft>
              <SlideRight>
                <Form.Markdown style={{ boxShadow: '0 0 0 white' }}>
                  <ReactMde
                    layout={'tabbed'}
                    onChange={this.handleValueChange}
                    editorState={this.state.mdeState}
                    generateMarkdownPreview={markdown =>
                      Promise.resolve(this.converter.makeHtml(markdown))
                    }
                  />
                </Form.Markdown>
              </SlideRight>
              <SlideBottom style={{ padding: '1.5em' }}>
                <StyledLink
                  to="/threads/1"
                  onClick={() =>
                    this.props.postNewThread(
                      this.state.title,
                      this.state.mdeState.html,
                      this.props.loggedInUserId,
                      this.props.username
                    )
                  }
                >
                  Submit Thread
                </StyledLink>
              </SlideBottom>
            </FadeIn>
          </Form>
        </ThreadFormCard>
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
