// Builds the string that will be passed into the ReactMde utility methods
export const quotePostInEditor = (quotedUser, quotedPost) => {
  return (
    '<blockquote>\n' +
    '<p>' +
    quotedUser +
    ' said</p>' +
    removeNestedQuotes(quotedPost) +
    '\n</blockquote>'
  )
}

// Ensures that quoted posts don't end up in a tangled mess of nested quotes
const removeNestedQuotes = string => {
  let regex = /<blockquote>[\s\S]*<\/blockquote>/
  let new_str = string.replace(regex, '')
  return new_str
}
