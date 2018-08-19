import React, { Component } from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import store from './store'

import User from './components/User'

const Wrapper = styled.div`
  text-align: center;
`
const Header = styled.div`
  background-color: papayawhip;
  height: 150px;
  padding: 20px;
  color: palevioletred;
`

const Button = styled.button`
  background-color: palevioletred;
  padding: 15px 1em;
  color: papayawhip;
`

class App extends Component {

  addUserTest = () => {
    fetch('/api/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: 1, text: 'this is my thread content!' })
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <Header>
            <User />
            <Button onClick={this.addUserTest}>click</Button>
          </Header>
        </Wrapper>
      </Provider>
    )
  }
}

export default App
