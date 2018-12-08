import axios from 'axios'

export const editAvatar = async (userId, newAvatarUrl) => {
  await axios({
    method: 'post',
    url: `/api/users/${userId}/avatar`,
    data: {
      userId,
      newAvatarUrl
    }
  })
}

// Checks to see if img url provided is valid
export const checkUrlExists = async testUrl => {
  const request = await axios.get(testUrl, {
    mode: 'cors',
    withCredentials: false,
    validateStatus: status => status >= 200
  })

  let result = request.headers['content-type']
  return result.includes('image')
}
