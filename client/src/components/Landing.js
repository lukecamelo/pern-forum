import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from './UserControlPanel'
import Footer from './Footer'
import NavBar from './NavBar'
import styled from 'styled-components'
import { Container, Ul, Li, I, P, Strong } from '../styled'
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
                    now <Strong>stand alone</Strong>. No more 20 year old software.
                  </P>
                </Li>
                <Li>
                  <I className="fas fa-ban fa-2x" />
                  <P>
                    Completely <Strong>lowtax free</Strong>. Free of his poor judgment, the world is our oyster
                  </P>
                </Li>
                <Li>
                  <I className="fas fa-users fa-2x" />
                  <P>
                    It is also <Strong>regular free</Strong>. you don't have to
                    pay 10 bucks to post here. I only ask that you are chill and
                    love video games. Welcome.
                  </P>
                </Li>
              </Ul>
            </SlideLeft>
            <Link
              to="/subforums"
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
