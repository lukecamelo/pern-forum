import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Container } from '../styled/index'
import NavBar from '../components/NavBar'
import PostForm from '../components/PostForm'
import Pagination from '../components/Pagination'
import PostList from '../components/PostList'
import Avatar from 'react-avatar'
import marked from 'marked'
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
  // border-bottom: 2px solid white;
  text-align: left;
`
const PostWrapper = styled.div`
  // border: 1px solid ${props => props.theme.secondary};
  display: flex;
  background-color: white;
  text-align: left;
  padding: 0 1em 1em 1em;
  margin-bottom: 1em;
`
const User = styled.div`
  margin-right: 1em;
`
const Author = styled.h2`
  color: ${props => props.theme.primary}
  font-size: 18px;
`
// const PostContent = styled.p`
//   color: black;
//   font-size: 16px;
//   padding: 0 15px 15px 15px;
// `

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
    this.fetchThreadAndAuthor()
  }

  fetchSingleThread = async threadId => {
    const thread = await axios.get(`/api/threads/${threadId}`)
    return thread.data
  }

  fetchThreadAuthor = async userId => {
    const author = await axios.get(`/api/users/${userId}`)
    return author.data
  }

  fetchThreadAndAuthor = async () => {
    const thread = await this.fetchSingleThread(this.props.match.params.id)
    const author = await this.fetchThreadAuthor(thread.userId)
    await this.setState({
      title: thread.title,
      content: thread.content,
      threadPosts: thread.Post,
      userId: thread.userId,
      author: author.username,
      threadHasLoaded: true
    })
  }

  getMarkdownText = markdown => {
    const rawMarkup = marked(markdown, { sanitize: false })
    return { __html: rawMarkup }
  }

  render() {
    const { title, author, threadHasLoaded, threadPosts } = this.state

    if (threadHasLoaded) {
      const posts = threadPosts.map(post => (
        <PostWrapper key={post.id}>
          <User>
            <Author>{post.author}</Author>
            <p>post count: {post.user.postCount}</p> 
            <Avatar size="150" src={post.user.avatarUrl} />
          </User>
          <div dangerouslySetInnerHTML={this.getMarkdownText(post.content)} />
        </PostWrapper>
      ))
      const op = posts.shift()

      return (
        <Container>
          <NavBar />
          <ThreadWrapper>
            <ThreadHeader>
              {title} / {author}
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
