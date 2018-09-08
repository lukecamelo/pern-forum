import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Container } from '../components/Login'
import NavBar from '../components/NavBar'
import PostForm from '../components/PostForm'
import Pagination from '../components/Pagination'
import PostList from '../components/PostList'
import Avatar from 'react-avatar'
// import { Author, PostWrapper, PostContent } from '../components/PostList'

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
  margin-bottom: 1em;
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
const PostWrapper = styled.div`
  // border: 1px solid ${props => props.theme.secondary};
  display: flex;
  background-color: white;
  text-align: left;
  padding: 0 1em 1em 1em;
`
const User = styled.div``
const Author = styled.h2`
  color: ${props => props.theme.primary}
  font-size: 18px;
`
const PostContent = styled.p`
  color: black;
  font-size: 16px;
  padding: 0 15px 15px 15px;
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

  componentDidMount = async () => {
    const {
      match: { params }
    } = this.props

    this.fetchThreadAndAuthor()
  }

  fetchSingleThread = async threadId => {
    const thread = await axios.get(`/api/threads/${threadId}`)
    console.log(thread.data)
    return thread.data
  }

  fetchThreadAuthor = async userId => {
    const author = await axios.get(`/api/users/${userId}`)
    return author.data
  }

  fetchThreadAndAuthor = async () => {
    const thread = await this.fetchSingleThread(this.props.match.params.id)
    console.log(thread)
    const author = await this.fetchThreadAuthor(thread.userId)
    this.setState({
      title: thread.title,
      content: thread.content,
      threadPosts: thread.Post,
      userId: thread.userId,
      author: author.username,
      threadHasLoaded: true
    })
  }
  render() {
    const { title, content, author, threadHasLoaded, threadPosts } = this.state
    if (threadHasLoaded) {
      const posts = threadPosts.map(post => (
        <PostWrapper key={post.id}>
          <User>
            <Author>{post.author}</Author>
            <Avatar size="150" src={post.user.avatarUrl} />
          </User>
          <PostContent>{post.content}</PostContent>
        </PostWrapper>
      ))
      const op = posts.shift()

      return (
        <Container>
          <NavBar />
          <ThreadWrapper>
            <ThreadHeader>
              {title}, posted by {author}
            </ThreadHeader>
            <StyledThread>{op}</StyledThread>

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
