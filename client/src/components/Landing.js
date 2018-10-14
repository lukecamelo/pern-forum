import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from './UserControlPanel'
import NavBar from './NavBar'
import styled from 'styled-components'

const Header = styled.h1`
  font-size: 2em;
  color: rgb(61, 72, 82);
  margin-bottom: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  > strong {
    @media screen and (max-width: 532px) {
      display: block;
    }
    color: #0266c8;
  }
`
const Li = styled.li`
  width: 75%;
  margin: 0 auto;
  padding: 1em 0;
  display: flex;
  justify-content: flex-start;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    > p {
      text-align: center;
      width: 300px;
    }
  }
`
const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`
const I = styled.i`
  min-height: 50px;
  min-width: 50px;
  margin-right: 0.5em;
  color: #0266c8;
`
const P = styled.p`
  font-size: 18px;
  line-height: 1.5;
  margin: 0;
  display: inline-block;
  text-align: left;
`
const Strong = styled.strong`
  color: #0266c8;
`
const Landing = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Card style={{ color: '#3d4852' }}>
        <Header>
          Welcome to the <strong>imp zone</strong>
        </Header>
        <Ul>
          <Li>
            <I className="fas fa-gamepad fa-2x" />
            <P>
              Greatest video game forum on the internet, now{' '}
              <Strong>stand alone</Strong> and not based on 20 year old software
            </P>
          </Li>
          <Li>
            <I className="fas fa-ban fa-2x" />
            <P>
              Completely <Strong>lowtax free</Strong>, and therefore will
              recieve timely updates and a modern design
            </P>
          </Li>
          <Li>
            <I className="fas fa-users fa-2x" />
            <P>
              Also it's <Strong>regular free</Strong>, gone are the days of
              paying 10bux for the privilege to post on, as mentioned before,
              the greatest video game forum on the internet
            </P>
          </Li>
        </Ul>
        <Link
          to="/threads/1"
          className="navlink"
          style={{ width: '150px', margin: '1em auto' }}
        >
          Check it out
        </Link>
      </Card>
    </React.Fragment>
  )
}

export default Landing
