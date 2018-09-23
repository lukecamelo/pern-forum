import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
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
const slideInLeft = keyframes`
  0% { transform: translateX(-25px); }
  100% { transform: translateX(0px); }
`
const slideInRight = keyframes`
  0% { transform: translateX(25px); }
  100% { transform: translateX(0px); }
`
export const ThreadHeader = styled.h2`
  margin-left: 1em;
  text-align: left;
  animation: ${slideInRight} .9s cubic-bezier(.28,1,.14,.99);
`
const PostWrapper = styled.div`
  // border: 1px solid ${props => props.theme.secondary};
  display: flex;
  background-color: white;
  text-align: left;
  padding: 0 1em 1em 1em;
  margin-bottom: 1em;
  blockquote {
    border-left: 4px solid ${props => props.theme.primary};
  }
`
const User = styled.div`
  margin-right: 1em;
  animation: ${slideInLeft} .7s cubic-bezier(.28,1,.14,.99);
`
const Author = styled.h2`
  color: ${props => props.theme.primary}
  font-size: 18px;
`
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`
const AnimationContainer = styled.div`
  animation: 1s ${fadeIn} cubic-bezier(.52,.79,.3,.98);
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
          <User className='usah'>
            <Author>{post.author}</Author>
            <p>post count: {post.user.postCount}</p>
            <Avatar size="150" src={post.user.avatarUrl} />
          </User>
          <div className='markdown-shiz' dangerouslySetInnerHTML={this.getMarkdownText(post.content)} />
        </PostWrapper>
      ))
      const op = posts.shift()

      return (
        <Container>
          <NavBar />
          <AnimationContainer>
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
