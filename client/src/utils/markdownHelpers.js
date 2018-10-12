export const quotePostInEditor = (quotedUser, quotedPost) => {
  return (
    '<blockquote>\n' +
    quotedUser +
    ' said \n' +
    quotedPost +
    '\n</blockquote>'
  )
}

export const clearEditor = () => {
  return ''
}