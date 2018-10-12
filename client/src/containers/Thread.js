import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import PostForm from '../components/PostForm'
import EditPostModal from '../components/EditPostModal'
import PostList from '../components/PostList'
import Loader from '../components/Loader'

import { connect } from 'react-redux'
import { makeNewPost } from '../actions/threadActions'

import { Container, H1 } from '../styled/index'
import StyledThread from '../styled/StyledThread'
import { FadeIn, SlideTop } from '../styled/animations'
import './Thread.css'

import { fetchThreadAndAuthor, fetchSingleThread } from '../utils/threadHelpers'

export class Thread extends Component {
  state = {
    title: '',
    content: '',
    author: '',
    threadPosts: [],
    userId: null,
    threadHasLoaded: false,
    windowWidth: 0,
    openModal: false,
    postBeingEdited: null,
    quotedPost: '',
    quotedUser: '',
    postContent: ''
  }

  componentDidMount = async () => {
    if (!this.state.threadHasLoaded || !this.state.threadPosts.length) {
      const result = await fetchThreadAndAuthor(this.props.match.params.id)
      await this.setState({
        title: result.title,
        content: result.content,
        author: result.author,
        threadPosts: result.threadPosts,
        userId: result.userId,
        threadHasLoaded: result.threadHasLoaded
      })
    }
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth })
  }

  toggleModal = (postId, postContent) => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      postBeingEdited: postId,
      postContent
    }))
  }

  handleSubmit = async (content, username, userId, threadId) => {
    await this.props.makeNewPost(content, username, userId, threadId)
    let thread = await fetchSingleThread(threadId)
    this.setState({
      threadPosts: thread.Post
    })
  }

  quotePost = (postContent, quotedUser) => {
    this.setState({
      quotedPost: postContent,
      quotedUser
    })
  }

  render() {
    const { title, author, threadHasLoaded, threadPosts = [] } = this.state
    const isMobile = this.state.windowWidth < 700 ? true : false
    const mobileEditStyle = {
      margin: '1em 4px 4px 4px',
      padding: '2px 2px',
      justifySelf: 'flex-end',
      boxShadow: 'none'
    }

    if (threadHasLoaded) {
      return (
        <Container>
          <NavBar />
          <FadeIn>
            <StyledThread>
              <SlideTop>
                <StyledThread.Header>
                  <H1 style={{ margin: '0', color: 'white' }}>
                    {title} / {author}
                  </H1>
                </StyledThread.Header>
              </SlideTop>

              {threadPosts.length ? (
                <PostList
                  data={this.state.threadPosts}
                  currentPage={this.props.match.params.page}
                  threadId={this.props.match.params.id}
                  context="posts"
                  windowWidth={this.state.windowWidth}
                  quotePost={this.quotePost}
                  toggleModal={this.toggleModal}
                  loggedInUserId={this.props.loggedInUserId}
                />
              ) : null}
            </StyledThread>

            {this.state.openModal ? (
              <EditPostModal
                isMobile={isMobile}
                toggleModal={this.toggleModal}
                postId={this.state.postBeingEdited}
                threadId={this.props.match.params.id}
                postContent={this.state.postContent}
              />
            ) : null}
          </FadeIn>
          <PostForm
            threadId={this.props.match.params.id}
            isMobile={isMobile}
            quotedPost={this.state.quotedPost}
            quotedUser={this.state.quotedUser}
            submit={this.handleSubmit}
          />
        </Container>
      )
    } else {
      return (
        <Container>
          <NavBar />
          <Loader />
        </Container>
      )
    }
  }
}

const mapStateToProps = state => ({
  loggedInUserId: state.auth.userId
})

export default connect(
  mapStateToProps,
  { makeNewPost }
)(Thread)
