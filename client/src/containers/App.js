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
  mockLogin = () => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'rediscover', password: 'testpassword' })
    })
      .then(res => res.json())
      .then(json => console.log(json))
  }

  mockProfile = () => {
    fetch('/profile')
      .then(res => res.json())
      .then(json => console.log(json))
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
