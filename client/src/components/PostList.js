import Pagination from './Pagination'
import React from 'react'
import { Button, DeleteButton } from '../styled/index'
import Post from '../styled/Post'
import Avatar from 'react-avatar'
import { SlideLeft } from '../styled/animations'
import moment from 'moment'
import '../css/Thread.css'

import { getMarkdownText, parseIsoDatetime } from '../utils/threadHelpers'

const PostList = ({
  data,
  windowWidth,
  auth,
  toggleModal,
  quotePost,
  currentPage,
  threadId,
  deletePost
}) => {
  const isMobile = windowWidth < 880 ? true : false
  const mobileButtonStyle = {
    margin: '1em 4px 4px 4px',
    padding: '2px 2px',
    justifySelf: 'flex-end',
    boxShadow: 'none'
  }

  // Building array of Post components using the post data passed via props
  const posts = data.map(post => (
    <SlideLeft key={post.id}>
      <Post className="post-wrapper">
        <Post.User>
          <Post.Author>
            {post.author}
            <p>{parseIsoDatetime(post.user.createdAt)}</p>
            <p>{post.user.postCount} posts</p>
          </Post.Author>

          <Avatar size={isMobile ? '75' : '150'} src={post.user.avatarUrl} />
        </Post.User>
        <Post.Body>
          <div
            className="markdown-shiz"
            style={
              isMobile
                ? {
                    paddingTop: '1em',
                    paddingLeft: '1em',
                    paddingRight: '1em'
                  }
                : { paddingTop: '1em' }
            }
            dangerouslySetInnerHTML={getMarkdownText(post.content)}
          />

          {/*
           Edit/Quote/Delete buttons being rendered based on certain conditions,
           such as if the logged in user is the one who made the post 
          */}
          <Post.Controls>
            <p>{moment(post.createdAt).fromNow()}</p>
            <div className="buttons">
              {auth.userId === post.user.id && auth.isLoggedIn ? (
                <Button
                  style={
                    isMobile
                      ? mobileButtonStyle
                      : {
                          marginBottom: '0',
                          marginLeft: '0',
                          boxShadow: 'none'
                        }
                  }
                  onClick={() => toggleModal(post.id, post.content)}
                >
                  Edit
                </Button>
              ) : null}
              {auth.isLoggedIn ? (
                <Button
                  style={
                    isMobile
                      ? mobileButtonStyle
                      : {
                          marginBottom: '0',
                          marginLeft: '0',
                          boxShadow: 'none'
                        }
                  }
                  onClick={() => quotePost(post.content, post.user.username)}
                >
                  Quote
                </Button>
              ) : null}
              {auth.userId === 1 ? (
                <DeleteButton
                  style={
                    isMobile
                      ? mobileButtonStyle
                      : {
                          marginBottom: '0',
                          marginLeft: '0',
                          boxShadow: 'none'
                        }
                  }
                  onClick={() => deletePost(post.id, threadId)}
                >
                  Delete
                </DeleteButton>
              ) : null}
            </div>
          </Post.Controls>
        </Post.Body>
      </Post>
    </SlideLeft>
  ))

  // Returns a paginated list of post components
  return (
    <Pagination
      data={posts}
      currentPage={currentPage}
      threadId={threadId}
      context="posts"
      pageSize={10}
    >
      {data => <React.Fragment>{data}</React.Fragment>}
    </Pagination>
  )
}

export default PostList
