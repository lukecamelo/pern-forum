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

const Button = styled.button`
  background-color: palevioletred;
  padding: 15px 1em;
  color: papayawhip;
`

class App extends Component {
  state = {
    response: [],
    username: ''
  }

  componentDidMount = () => {
    this.apiCall()
      .then(response => {
        this.setState({ response })
      })
      .catch(err => console.log(err))
  }

  apiCall = async () => {
    const response = await fetch('/api/users', { method: 'GET' })
    const data = await response.json()

    if (response.status !== 200) throw Error(data.message)

    return data
  }

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
    if (this.state.response.length) {
      return (
        <Wrapper>
          <Header>
            {this.state.response[0].username}
            <Button onClick={this.addUserTest}>click</Button>
          </Header>
        </Wrapper>
      )
    } else {
      return (
        <Header>
          <h1>nothing here</h1>
        </Header>
      )
    }
  }
}

export default App
