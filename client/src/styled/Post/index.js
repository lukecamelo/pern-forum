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
  padding: 0 1em 0 0;
  margin-bottom: 0.5em;
  box-shadow: ${props => props.theme.smallShadow};
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