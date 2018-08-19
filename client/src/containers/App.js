import React, { Component } from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import store from '../store'

import Thread from './Thread'

const Wrapper = styled.div`
  text-align: center;
`
const Header = styled.div`
  background-color: #e0cba8;
  height: 150px;
  padding: 20px;
  color: #564154;
`

class App extends Component {
  state = {
    user: null,
    loggedIn: false
  }

  componentDidMount = () => {
    if (localStorage.Authorization) {
      this.getUser()
    }
  }

  mockLogin = () => {
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'rediscover', password: 'testpassword' })
    })
      .then(res => res.json())
      .then(res => {
        localStorage.Authorization = res.token
      })
  }

  getUser = () => {
    fetch('/user/profile', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.Authorization
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          user: res.username
        })
      })
  }

  logout = () => {
    localStorage.removeItem('Authorization')
  }

  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <Header>
            <h1>Greetings, {this.state.user}</h1>
            <button onClick={this.mockLogin}>Login Test</button>
            <button onClick={this.logout}>Logout Test</button>
          </Header>
          <Thread />
        </Wrapper>
      </Provider>
    )
  }
}

export default App
