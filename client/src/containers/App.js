import React, { Component } from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import store from '../store'

import Login from '../components/Login'
import Signup from '../components/Signup'

const Wrapper = styled.div`
  text-align: center;
`
const Header = styled.div`
  height: 150px;
  padding: 20px;
  color: #564154;
`

class App extends Component {
  state = {
    user: null,
    isLoggedIn: false
  }

  // componentDidMount = () => {
  //   if (localStorage.Authorization) {
  //     this.getUser()
  //   }
  // }

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
        this.setState({
          isLoggedIn: true
        })
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

  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <Header>
            <Login />
            <Signup/>
          </Header>
        </Wrapper>
      </Provider>
    )
  }
}

export default App
