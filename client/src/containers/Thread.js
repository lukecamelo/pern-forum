import React, { Component } from 'react'
import styled from 'styled-components'
import { Container } from '../components/Login'
import NavBar from '../components/NavBar'
import PostForm from '../components/PostForm'
import Pagination from '../components/Pagination'
import PostList from '../components/PostList'
import { Author, PostWrapper, PostContent } from '../components/PostList'

const ThreadWrapper = styled.section`
  background-color: #dff4ff;
  color: #564154;
  padding: 2em;
`
const StyledThread = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #32343b;
  background-color: white;
  border: 2px solid ${props => props.theme.primary};
`
export const ThreadHeader = styled.h2`
  margin-left: 1em;
  border-bottom: 2px solid ${props => props.theme.secondary}
  text-align: left;
`
const ThreadContent = styled.p`
  padding-left: 10px;
  padding-right: 10px;
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
    const {
      match: { params }
    } = this.props
    this.fetchSingleThread(params.id)
      .then(thread =>
        this.setState({
          title: thread.title,
          content: thread.content,
          threadPosts: thread.Post,
          userId: thread.userId
        })
      )
      .then(() => {
        this.fetchThreadAuthor(this.state.userId).then(author =>
          this.setState({ author: author.username, threadHasLoaded: true })
        )
      })
  }

  fetchSingleThread = async threadId => {
    const result = await fetch(`/api/threads/${threadId}`)
    const thread = result.json()
    return thread
  }

  fetchThreadAuthor = async userId => {
    const result = await fetch(`/api/users/${userId}`)
    const author = result.json()
    return author
  }

  render() {
    const { title, content, author, threadHasLoaded, threadPosts } = this.state
    if (threadHasLoaded) {
      const posts = threadPosts.map(post => (
        <PostWrapper key={post.id}>
          <Author>{post.author}</Author>
          <PostContent>{post.content}</PostContent>
        </PostWrapper>
      ))

      return (
        <Container>
          <NavBar />
          <ThreadWrapper>
            <StyledThread>
              <ThreadHeader>
                {title}, posted by {author}
              </ThreadHeader>
              <ThreadContent>{content}</ThreadContent>
            </StyledThread>

            {posts.length ? (
              <Pagination data={posts}>
                <PostList />
              </Pagination>
            ) : (
              <h1>make the first post!</h1>
            )}
          </ThreadWrapper>
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
