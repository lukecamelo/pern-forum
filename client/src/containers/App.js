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
    token: null
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
        this.setState({
          token: res.token
        })
        console.log(res.token)
      })
  }

  mockProfile = () => {
    fetch('/user/profile', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + this.state.token
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <Header>
            <h1>Greetings from imp.zone!</h1>
            <button onClick={this.mockLogin}>Test</button>
            <button onClick={this.mockProfile}>Test 2</button>
          </Header>
          <Thread />
        </Wrapper>
      </Provider>
    )
  }
}

export default App
