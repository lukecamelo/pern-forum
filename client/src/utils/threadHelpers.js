import axios from 'axios'

export const fetchSingleThread = async threadId => {
  const thread = await axios.get(`/api/threads/${threadId}`)
  return thread.data
}

export const fetchThreadAuthor = async userId => {
  const author = await axios.get(`/api/users/${userId}`)
  return author.data
}

export const fetchThreadAndAuthor = async threadId => {
  const thread = await fetchSingleThread(threadId)
  const author = await fetchThreadAuthor(thread.userId)
  // this.setState({
  //   title: thread.title,
  //   content: thread.content,
  //   threadPosts: thread.Post,
  //   userId: thread.userId,
  //   author: author.username,
  //   threadHasLoaded: true
  // })
  return {
    title: thread.title,
    content: thread.content,
    threadPosts: thread.Post,
    userId: thread.userId,
    author: author.username,
    threadHasLoaded: true
  }
}