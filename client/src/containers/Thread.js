import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import PostForm from '../components/PostForm'
import EditPostModal from '../components/EditPostModal'
import PostList from '../components/PostList'
import Loader from '../components/Loader'

import { connect } from 'react-redux'
import { makeNewPost } from '../actions/threadActions'

import { Container, SubforumLink } from '../styled/index'
import StyledThread from '../styled/StyledThread'
import { FadeIn, SlideTop } from '../styled/animations'
import '../css/Thread.css'

import { fetchThreadAndAuthor } from '../utils/threadHelpers'
import api from '../services/api'
import Footer from '../components/Footer'

export class Thread extends Component {
  state = {
    subforum: {},
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
        subforum: result.subforum,
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
    this.setState(({ openModal }) => ({
      openModal: !openModal,
      postBeingEdited: postId,
      postContent
    }))
  }

  handleSubmit = async (content, username, userId, threadId) => {
    await this.props.makeNewPost(content, username, userId, threadId)
    let thread = await api.thread.getOne(threadId)
    this.setState({
      threadPosts: thread.Post
    })
  }

  handleDelete = async (postId, threadId) => {
    api.post.delete(postId)
    let thread = await api.thread.getOne(threadId)
    this.setState({
      threadPosts: thread.Post
    })
  }

  handleEdit = async (threadId, postId, content) => {
    await api.post.edit(threadId, postId, content)
    let thread = await api.thread.getOne(threadId)
    this.setState({
      threadPosts: thread.Post
    })
    this.toggleModal()
  }

  quotePost = (quotedPost, quotedUser) => {
    this.setState({
      quotedPost,
      quotedUser
    })
    this.el.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const {
      title,
      subforum,
      threadHasLoaded,
      threadPosts = []
    } = this.state
    const isMobile = this.state.windowWidth < 700 ? true : false
    const keepFooterSticky = this.state.windowWidth < 880 ? true : false

    if (threadHasLoaded) {
      return (
        <React.Fragment>
          <Container
            id="container"
            style={keepFooterSticky ? { marginBottom: '2em' } : null}
          >
            <NavBar />
            <FadeIn>
              <StyledThread>
                <SlideTop>
                  <StyledThread.Header>
                    <StyledThread.Navigation>
                      <SubforumLink
                        to="/subforums"
                        style={{ margin: '0', color: 'white' }}
                      >
                        Forums
                      </SubforumLink>
                      <i
                        className="fas fa-angle-right"
                        style={{ margin: '0 6px' }}
                      />
                      <SubforumLink
                        to={`/subforum/${subforum.id}/page/1`}
                        style={{
                          margin: '0',
                          color: 'white',
                          display: 'inline'
                        }}
                      >
                        {subforum.name}
                      </SubforumLink>
                      <i
                        className="fas fa-angle-right"
                        style={{ margin: '0 6px' }}
                      />
                      <StyledThread.Navigation.Title>
                        {title}
                      </StyledThread.Navigation.Title>
                    </StyledThread.Navigation>
                  </StyledThread.Header>
                </SlideTop>

                {threadPosts.length ? (
                  <PostList
                    data={threadPosts}
                    currentPage={this.props.match.params.page}
                    threadId={this.props.match.params.id}
                    context="posts"
                    windowWidth={this.state.windowWidth}
                    quotePost={this.quotePost}
                    toggleModal={this.toggleModal}
                    auth={this.props.auth}
                    deletePost={this.handleDelete}
                  />
                ) : null}
              </StyledThread>

              {this.state.openModal && (
                <EditPostModal
                  isMobile={isMobile}
                  toggleModal={this.toggleModal}
                  postId={this.state.postBeingEdited}
                  threadId={this.props.match.params.id}
                  postContent={this.state.postContent}
                  handleEdit={this.handleEdit}
                />
              )}
            </FadeIn>
            <PostForm
              name="postForm"
              threadId={this.props.match.params.id}
              isMobile={isMobile}
              quotedPost={this.state.quotedPost}
              quotedUser={this.state.quotedUser}
              submit={this.handleSubmit}
            />
            <div
              ref={el => {
                this.el = el
              }}
            />
          </Container>
          <Footer />
        </React.Fragment>
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
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { makeNewPost }
)(Thread)
