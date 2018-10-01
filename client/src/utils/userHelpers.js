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