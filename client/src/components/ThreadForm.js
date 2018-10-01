import React, { Component } from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import { connect } from 'react-redux'
import { postNewThread, fetchThreads } from '../actions/threadActions'

import NavBar from './NavBar'
import './NavBar.css'
import styled from 'styled-components'
import Form from '../styled/Form'
import { Container, StyledLink } from '../styled/index'
import {
  fadeIn,
  slideInLeft,
  slideInRight,
  slideInBottom
} from '../styled/keyframes/index'

const FormFadeIn = styled.div`
  animation: 1s ${fadeIn} cubic-bezier(0.52, 0.79, 0.3, 0.98);
`
const TitleSlide = styled.div`
  animation: 0.8s ${slideInLeft} cubic-bezier(0.28, 1, 0.14, 0.99);
`
const MarkdownSlide = styled.div`
  animation: 0.8s ${slideInRight} cubic-bezier(0.28, 1, 0.14, 0.99);
`
const ButtonSlide = styled.div`
  animation: 0.8s ${slideInBottom} cubic-bezier(0.28, 1, 0.14, 0.99);
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
        <h1>Post new thread</h1>
        <Form style={{ width: '100%' }}>
          <FormFadeIn>
            <TitleSlide>
              <Form.Input
                style={{ width: '400px' }}
                name="title"
                value={this.state.title}
                onChange={this.changeHandler}
                placeholder="thread title"
              />
            </TitleSlide>
            <MarkdownSlide>
              <Form.Markdown>
                <ReactMde
                  layout={'tabbed'}
                  onChange={this.handleValueChange}
                  editorState={this.state.mdeState}
                  generateMarkdownPreview={markdown =>
                    Promise.resolve(this.converter.makeHtml(markdown))
                  }
                />
              </Form.Markdown>
            </MarkdownSlide>
            <form onSubmit={this.handleSubmit}>
              <ButtonSlide>
                <StyledLink
                  to="/threads/1"
                  type="submit"
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
              </ButtonSlide>
            </form>
          </FormFadeIn>
        </Form>
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
