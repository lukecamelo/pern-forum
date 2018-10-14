import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from './UserControlPanel'
import Footer from './Footer'
import NavBar from './NavBar'
import styled from 'styled-components'
import { Container } from '../styled'
import { FadeIn, SlideLeft, SlideTop } from '../styled/animations'

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
  @media screen and (max-width: 532px) {
    margin-right: 0;
  }
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
      <Container>
        <NavBar />
        <FadeIn>
          <Card style={{ color: '#3d4852', marginBottom: '2em' }}>
            <SlideTop>
              <Header>
                Welcome to <strong>imp.zone</strong>
              </Header>
            </SlideTop>
            <SlideLeft>
              <Ul>
                <Li>
                  <I className="fas fa-gamepad fa-2x" />
                  <P>
                    The greatest video game discussion forum on the internet is
                    now <Strong>stand alone</Strong>. We won't be posting on 20
                    year old software anymore.
                  </P>
                </Li>
                <Li>
                  <I className="fas fa-ban fa-2x" />
                  <P>
                    Completely <Strong>lowtax free</Strong>. imp.zone will not
                    stagnate like SA. Web 3.0 here we come
                  </P>
                </Li>
                <Li>
                  <I className="fas fa-users fa-2x" />
                  <P>
                    It is also <Strong>regular free</Strong>. you don't have to
                    pay 10bux to post here. We only ask that you are chill and
                    love video games. Welcome.
                  </P>
                </Li>
              </Ul>
            </SlideLeft>
            <Link
              to="/threads/1"
              className="navlink"
              style={{ width: '150px', margin: '1em auto' }}
            >
              Check it out
            </Link>
          </Card>
        </FadeIn>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default Landing
