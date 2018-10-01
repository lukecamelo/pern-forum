import React, { Component } from 'react'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import PostForm from '../components/PostForm'
import Pagination from '../components/Pagination'
import EditPostModal from '../components/EditPostModal'
import PostList from '../components/PostList'
import Avatar from 'react-avatar'
import marked from 'marked'

import { connect } from 'react-redux'

import { Container, Button } from '../styled/index'
import Post from '../styled/Post'
import StyledThread from '../styled/StyledThread'
import { fadeIn, slideInLeft } from '../styled/keyframes/index'

import { fetchThreadAndAuthor, getMarkdownText } from '../utils/threadHelpers'

const AnimationContainer = styled.div`
  animation: 0.6s ${fadeIn} cubic-bezier(0.52, 0.79, 0.3, 0.98);
`
const OpAnimation = styled.div`
  animation: 0.6s ${slideInLeft} cubic-bezier(0.28, 1, 0.14, 0.99);
`
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
    postBeingEdited: null
  }

  componentDidMount = async () => {
    const result = await fetchThreadAndAuthor(this.props.match.params.id)
    await this.setState({
      title: result.title,
      content: result.content,
      author: result.author,
      threadPosts: result.threadPosts,
      userId: result.userId,
      threadHasLoaded: result.threadHasLoaded
    })
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth })
  }

  toggleModal = postId => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      postBeingEdited: postId
    }))
  }

  handleSubmit = () => {
    try {
      this.props.makeNewPost(
        this.state.mdeState.html,
        this.props.auth.username,
        this.props.auth.userId,
        this.props.threadId
      )
    } catch (e) {
      alert(e.message)
    }
  }

  render() {
    const { title, author, threadHasLoaded, threadPosts = [] } = this.state
    const isMobile = this.state.windowWidth < 532 ? true : false
    const mobileEditStyle = {
      margin: '1em 4px 4px 4px',
      padding: '2px 2px',
      justifySelf: 'flex-end'
    }

    if (threadHasLoaded) {
      const posts = threadPosts.map(post => (
        <OpAnimation key={post.id}>
          <Post>
            <Post.User>
              <Post.Author>
                {post.author}
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
                dangerouslySetInnerHTML={getMarkdownText(post.content)}
              />
              <Post.Controls>
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
                    onClick={() => this.toggleModal(post.id)}
                  >
                    Edit post
                  </Button>
                ) : null}
              </Post.Controls>
            </Post.Body>
          </Post>
        </OpAnimation>
      ))
      const op = posts.shift()

      return (
        <Container>
          <NavBar />
          <AnimationContainer>
            <StyledThread>
              <StyledThread.Header>
                {title} / {author}
              </StyledThread.Header>

              <OpAnimation>{op}</OpAnimation>

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
              />
            ) : null}
          </AnimationContainer>
          <PostForm threadId={this.props.match.params.id} isMobile={isMobile} />
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
  null
)(Thread)
