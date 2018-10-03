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
  padding: 0 1em 1em 1em;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.primary};
    @media screen and (max-width: 532px) {
      flex-direction: column;
      padding: 0;
    }
`

Post.User = User
Post.Author = Author
Post.Body = Body
Post.Controls = Controls

export default Post