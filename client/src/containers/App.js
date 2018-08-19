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
  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <Header>
            <h1>Greetings from imp.zone!</h1>
          </Header>
          <Thread />
        </Wrapper>
      </Provider>
    )
  }
}

export default App
