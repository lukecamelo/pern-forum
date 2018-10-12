const PostList = ({ data }) => {
  // const posts = data.map(post => (
  //   <SlideLeft key={post.id}>
  //     <Post className="post-wrapper">
  //       <Post.User>
  //         <Post.Author>
  //           {post.author}
  //           <p>{parseIsoDatetime(post.user.createdAt)}</p>
  //           <p>{post.user.postCount} posts</p>
  //         </Post.Author>

  //         <Avatar size={isMobile ? '75' : '150'} src={post.user.avatarUrl} />
  //       </Post.User>
  //       <Post.Body>
  //         <div
  //           className="markdown-shiz"
  //           style={
  //             isMobile
  //               ? {
  //                   paddingTop: '1em',
  //                   paddingLeft: '1em',
  //                   paddingRight: '1em'
  //                 }
  //               : { paddingTop: '1em' }
  //           }
  //           dangerouslySetInnerHTML={getMarkdownText(post.content)}
  //         />

  //         <Post.Controls>
  //           <p>{parseIsoDatetime(post.createdAt)}</p>
  //           <div className="buttons">
  //             {this.props.loggedInUserId === post.user.id ? (
  //               <Button
  //                 style={
  //                   isMobile
  //                     ? mobileEditStyle
  //                     : {
  //                         marginBottom: '0',
  //                         marginLeft: '0',
  //                         boxShadow: 'none'
  //                       }
  //                 }
  //                 onClick={() => this.toggleModal(post.id, post.content)}
  //               >
  //                 Edit
  //               </Button>
  //             ) : null}
  //             <Button
  //               style={
  //                 isMobile
  //                   ? mobileEditStyle
  //                   : {
  //                       marginBottom: '0',
  //                       marginLeft: '0',
  //                       boxShadow: 'none'
  //                     }
  //               }
  //               onClick={() => this.quotePost(post.content, post.user.username)}
  //             >
  //               Quote
  //             </Button>
  //           </div>
  //         </Post.Controls>
  //       </Post.Body>
  //     </Post>
  //   </SlideLeft>
  // ))
  return data
}

export default PostList
