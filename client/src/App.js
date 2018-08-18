import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
`
const Header = styled.div`
  background-color: papayawhip;
  height: 150px;
  padding: 20px;
  color: palevioletred;
`

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
         <h1>PERN-Forum prototype</h1>
        </Header>
      </Wrapper>
    )
  }
}

export default App
