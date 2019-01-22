import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Input, Button, H1 } from '../styled/index'
import axios from 'axios'
import styled from 'styled-components'
import NavBar from './NavBar'

import {
  FadeIn,
  SlideLeft,
  SlideRight,
  SlideBottom,
  SlideTop
} from '../styled/animations'

export const Card = styled.section`
  display: flex;
  text-align: center;
  justify-content: center;
  justify-self: center;
  flex-direction: column;
  background-color: #fff;
  box-shadow: ${props => props.theme.largeShadow};
  margin: 1em 25% 0 25%;
  @media screen and (max-width: 900px) {
    margin: 1em 4em 0 4em;
  }
  @media screen and (max-width: 532px) {
    margin: 1em 1em 0 1em;
  }
`
const AvatarEdit = styled.div`
  margin: 0 3em;
`

export const UserControlPanel = ({ user }) => {
  const [message, setMessage] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  async function useUserAvatarUrl(userId) {
    const user = await axios.get(`/api/users/${userId}`)
    await setAvatarUrl(user.data.avatarUrl)
  }

  // TODO: add image validity check, utilize message
  async function editAvatar(userId, newAvatarUrl) {
    await axios({
      method: 'post',
      url: `/api/users/${userId}/avatar`,
      data: {
        userId,
        newAvatarUrl
      }
    })
  }

  function useAvatarInput(initialValue) {
    function handleChange(e) {
      setAvatarUrl(e.target.value)
    }
    return {
      value: avatarUrl,
      onChange: handleChange
    }
  }

  const avatar = useAvatarInput('')

  useEffect(
    () => {
      useUserAvatarUrl(user.userId)
    },
    [user.userId]
  )

  return (
    <Container>
      <NavBar />
      <FadeIn>
        <Card>
          <SlideTop>
            <H1>Welcome, {user.username}</H1>
          </SlideTop>
          <AvatarEdit>
            <SlideLeft>
              <h2 style={{ margin: '0 0 10px 0', color: '#0266c8' }}>
                Change avatar
              </h2>
              {message !== '' ? <h1>{message}</h1> : null}
            </SlideLeft>
            <SlideRight>
              <Input id="avatar-url-input" name="avatarUrl" {...avatar} />
            </SlideRight>
            <SlideBottom>
              <form>
                <Button onClick={() => editAvatar(user.userId, avatarUrl)}>
                  Apply
                </Button>
              </form>
            </SlideBottom>
          </AvatarEdit>
        </Card>
      </FadeIn>
    </Container>
  )
}

const mapStateToProps = state => ({
  user: state.auth
})

export default connect(mapStateToProps)(UserControlPanel)
