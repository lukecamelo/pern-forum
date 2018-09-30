import styled from 'styled-components'

import User from './User'
import Author from './Author'

const Post = styled.div`
  display: flex;
  background-color: white;
  text-align: left;
  padding: 0 1em 1em 1em;
  margin-bottom: 1em;
    @media screen and (max-width: 532px) {
      flex-direction: column;
    }
    &:first-child {
      border: 1px solid ${props => props.theme.primary};
    }
`

Post.User = User
Post.Author = Author

export default Post