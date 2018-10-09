import axios from 'axios'
import marked from 'marked'
import store from '../store'
const auth = store.getState().auth.token

export const fetchSingleThread = async threadId => {
  let thread = await axios.get(`/thread/${threadId}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${auth}`
    }
  })
  return thread.data
}

export const fetchThreadAuthor = async userId => {
  let author = await axios.get(`/api/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${auth}`
    }
  })
  return author.data
}

export const fetchThreadAndAuthor = async threadId => {
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
  axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`
    },
    url: `/thread/${threadId}/editpost`,
    data: { content, id }
  })
}

export const getMarkdownText = markdown => {
  const rawMarkup = marked(markdown, { sanitize: false })
  return { __html: rawMarkup }
}

export const parseIsoDatetime = dtstr => {
  var dt = dtstr.split(/[: T-]/).map(parseFloat)
  return new Date(
    dt[0],
    dt[1] - 1,
    dt[2],
    dt[3] || 0,
    dt[4] || 0,
    dt[5] || 0,
    0
  )
    .toString()
    .split(' ')
    .slice(1, 4)
    .join(' ')
}

export const checkForPosts = threads => {
  let increment = 0
  threads.forEach(thread => {
    if (thread.Post.length > 0) {
      increment++
    }
  })
  if (increment === threads.length) {
    return true
  }
  return false
}

// Still unsure of whether to use this or the Redux action
export const makeNewPost = (content, username, userId, threadId) => {
  return axios({
    url: `/thread/${threadId}/posts`,
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // Authorization: `Bearer ${auth}`
    },
    data: JSON.stringify({ content, username, userId, threadId })
  })
    // .then(res => res.json())
    .then(post => {
      console.log('post got made, ', post)
    })
    .catch(err => console.log('error making post: ', err))
}
