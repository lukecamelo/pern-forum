import React from 'react'
import { Container } from './Login'

const PostList = ({ data }) => {
  return (
    <Container key={data.id}>
      <h1>{data.author}</h1>
      <p>data.content</p>
    </Container>
  )
}

export default PostList
