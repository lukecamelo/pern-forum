import React from 'react'
import { connect } from 'react-redux'
import { Container, Input } from './Login'
import axios from 'axios'
import styled from 'styled-components'

const Card = styled.section`
  display: flex;
  justify-content: center;
  justify-self: center;
  background-color: #fff;
  box-shadow: 1px 1px 1px ${props => props.theme.secondary};
  margin: 0 25% 0 25%;
`

class UserControlPanel extends React.Component {
  state = {
    avatarUrl: ''
  }

  componentDidMount = () => {
    this.getUserAvatarUrl(this.props.user.userId)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getUserAvatarUrl = async userId => {
    const user = await axios.get(`/api/users/${userId}`)
    await this.setState({ avatarUrl: user.data.avatarUrl })
  }

  editAvatar = (userId, newAvatarUrl) => {
    axios({
        method: 'post',
        url: `/api/users/${userId}/avatar`,
        data: {
          userId,
          newAvatarUrl
        }
    })
  }

  render() {
    return (
      <Container>
        <Card>
          <h1>Welcome, {this.props.user.username}</h1>
          <h1>Change avatar: </h1>
          <Input
            name="avatarUrl"
            value={this.state.avatarUrl}
            onChange={this.handleChange}
          />
          <button onClick={this.editAvatar(this.props.user.userId, this.state.avatarUrl)}>Edit Avatar</button>
        </Card>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth
})

export default connect(mapStateToProps)(UserControlPanel)
