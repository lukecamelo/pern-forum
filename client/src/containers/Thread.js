import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import PostForm from '../components/PostForm'
import EditPostModal from '../components/EditPostModal'
import PostList from '../components/PostList'
import Loader from '../components/Loader'

import { connect } from 'react-redux'
import { makeNewPost } from '../actions/threadActions'

import { Container } from '../styled/index'
import StyledThread from '../styled/StyledThread'
import { FadeIn, SlideTop } from '../styled/animations'
import '../css/Thread.css'

import { fetchThreadAndAuthor } from '../utils/threadHelpers'
import api from '../services/api'
import Footer from '../components/Footer'
import Breadcrumb from '../styled/Breadcrumb'

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

  // All of these handlers fetch the thread after handling their respective tasks,
  // this was the best way I could think of at the time to rerender the thread
  // after making the submission/edit/deletion. maybe there's a cleaner way of doing this?

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
    const { title, subforum, threadHasLoaded, threadPosts = [] } = this.state
    // Used to switch markdown editor display layout between tabbed and vertical
    const isMobile = this.state.windowWidth < 700 ? true : false
    // Used to keep footer at bottom of page. Since this is an issue unique to threads I don't
    // use a regular media query to deal with it
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
                    <Breadcrumb>
                      <Breadcrumb.CrumbLink to="/subforums">
                        Forums
                      </Breadcrumb.CrumbLink>
                      <Breadcrumb.Chevron className="fas fa-angle-right" />
                      <Breadcrumb.CrumbLink
                        to={`/subforum/${subforum.id}/page/1`}
                      >
                        {subforum.name}
                      </Breadcrumb.CrumbLink>
                      <Breadcrumb.MobileLink
                        to={`/subforum/${subforum.id}/page/1`}
                      >
                        <i
                          className="fas fa-angle-left"
                          style={{ display: 'inline', margin: '0 6px' }}
                        />
                        {subforum.name}
                      </Breadcrumb.MobileLink>
                      <Breadcrumb.Chevron className="fas fa-angle-right" />
                      <Breadcrumb.Title>{title}</Breadcrumb.Title>
                    </Breadcrumb>
                  </StyledThread.Header>
                </SlideTop>

                {/*
                  Perhaps there's a way to break the PostList
                  component into smaller pieces to avoid the crazy
                  amount of props it requires?
                */}
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
            {/* Used to bring PostForm into focus when user quotes a post */}
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
