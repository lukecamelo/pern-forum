import React, { Component } from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import { connect } from 'react-redux'
import { postNewThread, fetchThreads } from '../actions/threadActions'

import NavBar from './NavBar'
import './NavBar.css'
import Form from '../styled/Form'
import { Container, StyledLink } from '../styled/index'
import { FadeIn, SlideLeft, SlideRight, SlideBottom} from '../styled/animations'

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
          <FadeIn>
            <SlideLeft>
              <Form.Input
                style={{ width: '400px' }}
                name="title"
                value={this.state.title}
                onChange={this.changeHandler}
                placeholder="thread title"
              />
            </SlideLeft>
            <SlideRight>
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
            </SlideRight>
            <form onSubmit={this.handleSubmit} style={{padding: '1.5em'}}>
              <SlideBottom>
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
              </SlideBottom>
            </form>
          </FadeIn>
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
