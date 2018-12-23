import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

// Centralizes API calls, simultaneously cleaning up many different components and
// making it more obvious as to what is being requested in any given context

export default {
  auth: {
    login: (username, password) =>
      axios
        .post(`/auth/login`, {
          username,
          password
        })
        .then(res => res.data),
    signup: (username, password, avatarUrl) =>
      axios
        .post(`/auth/signup`, {
          username,
          password,
          avatarUrl
        })
        .then(res => res.data),
    checkLogin: () =>
      axios
        .get('/users/profile', {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.Authorization)
          }
        })
        .then(res => res.data)
  },
  thread: {
    getOne: id => axios.get(`/thread/${id}`, headers).then(res => res.data),
    getAuthor: id =>
      axios.get(`/api/users/${id}`, headers).then(res => res.data),
    makePost: (content, username, userId, threadId) =>
      axios
        .post(`/thread/${threadId}/posts`, {
          content,
          username,
          userId,
          threadId
        })
        .then(res => res.data),
    deletePost: postId =>
      axios.get(`/thread/${postId}/deletepost`).then(res => res.data)
  },
  threads: {
    getAll: subforumId =>
      axios
        .get(`/thread/subforum/${subforumId}`, headers)
        .then(res => res.data),
    postOne: (title, content, userId, author, subforumId) =>
      axios
        .post(`/thread/threads`, {
          title,
          content,
          userId,
          author,
          subforumId
        })
        .then(res => res.data),
    getLatestSubforumThread: subforumId =>
      axios
        .get(`/thread/subforum/${subforumId}`, headers)
        .then(res => res.data[0])
  },
  users: {
    getAll: () => axios.get(`/api/users`, headers).then(res => res.data)
  },
  post: {
    create: (content, username, userId, threadId) =>
      axios
        .post(`/thread/${threadId}/posts`, {
          content,
          username,
          userId,
          threadId
        })
        .then(res => res.data),
    delete: postId =>
      axios.get(`/thread/${postId}/deletepost`).then(res => res.data),
    edit: (threadId, id, content) =>
      axios
        .post(`/thread/${threadId}/editpost`, {
          content,
          id
        })
        .then(res => res.data)
  }
}
