import React from 'react'
import styled from 'styled-components'

export const PostWrapper = styled.div`
  border: 1px solid ${props => props.theme.secondary};
  background-color: white;
  text-align: left;
  margin: 1em;
`
export const Author = styled.h2`
  color: ${props => props.theme.primary}
  font-size: 18px;
  margin-left: 15px;
`
export const PostContent = styled.p`
  color: black;
  font-size: 16px;
  padding: 0 15px 15px 15px;
`

const PostList = ({ data }) => {
  // const posts = data.map(post => (
  //   <PostWrapper key={post.id}>
  //     <Author>{post.author}</Author>
  //     <PostContent>{post.content}</PostContent>
  //   </PostWrapper>
  // ))

  return data
}

export default PostList
