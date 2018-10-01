import axios from 'axios'

export const fetchSingleThread = async (threadId) => {
  const thread = await axios.get(`/thread/${threadId}`)
  return thread.data
}

export const fetchThreadAuthor = async (userId) => {
  const author = await axios.get(`/api/users/${userId}`)
  return author.data
}

export const fetchThreadAndAuthor = async (threadId) => {
  const thread = await fetchSingleThread(threadId)
  const author = await fetchThreadAuthor(thread.userId)
  return {
    title: thread.title,
    content: thread.content,
    threadPosts: thread.Post,
    userId: thread.userId,
    author: author.username,
    threadHasLoaded: true
  }
}

export const filterAuthor = (threadArray, userId) => {
  return threadArray.find(user => user.id === userId).username
}

export const editPostContent = (threadId, id, content) => {
  axios.post(`/thread/${threadId}/editpost`, {
    content,
    id
  })
}