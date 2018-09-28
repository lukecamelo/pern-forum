import React, { Component } from 'react'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import PostForm from '../components/PostForm'
import Pagination from '../components/Pagination'
import PostList from '../components/PostList'
import Avatar from 'react-avatar'
import marked from 'marked'

import { Container } from '../styled/index'
import Post from '../styled/Post'
import StyledThread from '../styled/StyledThread'
import { fadeIn, slideInLeft } from '../styled/keyframes/index'

import { fetchThreadAndAuthor } from '../utils/threadHelpers'

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
    threadHasLoaded: false
  }

  componentDidMount = () => {
    fetchThreadAndAuthor(this.props.match.params.id).then(res => {
      this.setState({
        title: res.title,
        content: res.content,
        author: res.author,
        threadPosts: res.threadPosts,
        userId: res.userId,
        threadHasLoaded: res.threadHasLoaded
      })
    })
  }

  getMarkdownText = markdown => {
    const rawMarkup = marked(markdown, { sanitize: false })
    return { __html: rawMarkup }
  }

  render() {
    const { title, author, threadHasLoaded, threadPosts = [] } = this.state

    if (threadHasLoaded) {
      const posts = threadPosts.map(post => (
        <OpAnimation key={post.id}>
          <Post>
            <Post.User>
              <Post.Author>{post.author}</Post.Author>
              <p>post count: {post.user.postCount}</p>
              <Avatar size="150" src={post.user.avatarUrl} />
            </Post.User>
            <div
              className="markdown-shiz"
              dangerouslySetInnerHTML={this.getMarkdownText(post.content)}
            />
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

              <OpAnimation>
                <StyledThread.Body>{op}</StyledThread.Body>
              </OpAnimation>

              {posts.length ? (
                <Pagination
                  data={posts}
                  currentPage={this.props.match.params.page}
                  threadId={this.props.match.params.id}
                  context='posts'
                >
                  {data => <PostList data={data} />}
                </Pagination>
              ) : (
                <h1>make the first post!</h1>
              )}
            </StyledThread>
          </AnimationContainer>
          <PostForm threadId={this.props.match.params.id} />
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

export default Thread
