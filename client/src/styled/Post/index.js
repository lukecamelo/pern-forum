import styled from 'styled-components'

import User from './User'
import Author from './Author'

const Post = styled.div`
  display: flex;
  background-color: white;
  text-align: left;
  padding: 0 1em 1em 1em;
  margin-bottom: 1em;
  // box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12),
  // 0 2px 4px 0 rgba(0,0,0,0.08);
`

Post.User = User
Post.Author = Author

export default Post