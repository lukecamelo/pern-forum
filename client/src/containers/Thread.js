import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import PostForm from '../components/PostForm'
import Pagination from '../components/Pagination'
import EditPostModal from '../components/EditPostModal'
import PostList from '../components/PostList'
import Avatar from 'react-avatar'

import { connect } from 'react-redux'
import { makeNewPost } from '../actions/threadActions'

import { Container, Button } from '../styled/index'
import Post from '../styled/Post'
import StyledThread from '../styled/StyledThread'
import { FadeIn, SlideLeft } from '../styled/animations'
import './Thread.css'

import {
  fetchThreadAndAuthor,
  fetchSingleThread,
  getMarkdownText,
  parseIsoDatetime
} from '../utils/threadHelpers'

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
      justifySelf: 'flex-end'
    }

    if (threadHasLoaded) {
      // TODO: eventually move this stuff into PostList for better modularity
      const posts = threadPosts.map(post => (
        <SlideLeft key={post.id}>
          <Post className="post-wrapper">
            <Post.User>
              <Post.Author>
                {post.author}
                <p>{parseIsoDatetime(post.user.createdAt)}</p>
                <p>{post.user.postCount} posts</p>
              </Post.Author>

              <Avatar
                size={isMobile ? '75' : '150'}
                src={post.user.avatarUrl}
              />
            </Post.User>
            <Post.Body>
              <div
                className="markdown-shiz"
                style={
                  isMobile
                    ? {
                        paddingTop: '1em',
                        paddingLeft: '1em',
                        paddingRight: '1em'
                      }
                    : { paddingTop: '1em' }
                }
                dangerouslySetInnerHTML={getMarkdownText(post.content)}
              />

              <Post.Controls>
                <p>{parseIsoDatetime(post.createdAt)}</p>
                <div className="buttons">
                  {this.props.loggedInUserId === post.user.id ? (
                    <Button
                      style={
                        isMobile
                          ? mobileEditStyle
                          : {
                              marginBottom: '0',
                              marginLeft: '0'
                            }
                      }
                      onClick={() => this.toggleModal(post.id, post.content)}
                    >
                      Edit
                    </Button>
                  ) : null}
                  <Button
                    style={
                      isMobile
                        ? mobileEditStyle
                        : {
                            marginBottom: '0',
                            marginLeft: '0'
                          }
                    }
                    onClick={() =>
                      this.quotePost(post.content, post.user.username)
                    }
                  >
                    Quote
                  </Button>
                </div>
              </Post.Controls>
            </Post.Body>
          </Post>
        </SlideLeft>
      ))

      return (
        <Container>
          <NavBar />
          <FadeIn>
            <StyledThread>
              <StyledThread.Header>
                {title} / {author}
              </StyledThread.Header>

              {posts.length ? (
                <Pagination
                  data={posts}
                  currentPage={this.props.match.params.page}
                  threadId={this.props.match.params.id}
                  context="posts"
                >
                  {data => <PostList data={data} />}
                </Pagination>
              ) : (
                <h1>make the first post!</h1>
              )}
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
          <h1>Loading thread...</h1>
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
