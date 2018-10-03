import styled from 'styled-components'

import User from './User'
import Author from './Author'
import Body from './Body';
import Controls from './Controls';

const Post = styled.div`
  display: flex;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  background-color: white;
  text-align: left;
  // padding: 0 1rem 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.primary};
    @media screen and (max-width: 532px) {
      flex-direction: column;
      padding: 0 .5rem .5rem .5rem;
    }
`

Post.User = User
Post.Author = Author
Post.Body = Body
Post.Controls = Controls

export default Post