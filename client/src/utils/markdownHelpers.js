export const quotePostInEditor = (quotedUser, quotedPost) => {
  return (
    '<blockquote>\n' +
    '<p>' + quotedUser + ' said</p>' +
    removeNestedQuotes(quotedPost) +
    '\n</blockquote>'
  )
}

const removeNestedQuotes = string => {
  let regex = /<blockquote>[\s\S]*<\/blockquote>/
  let new_str = string.replace(regex, '')
  return new_str
}
