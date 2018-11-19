import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from './UserControlPanel'
import Footer from './Footer'
import NavBar from './NavBar'
import styled from 'styled-components'
import { Container, Ul, Li, P } from '../styled'
import { FadeIn, SlideLeft, SlideTop } from '../styled/animations'

const Header = styled.h1`
  font-size: 2em;
  color: rgb(61, 72, 82);
  margin-bottom: 1em;
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
                  <P>
                    I built this because I love old school style forums and
                    wanted to have one of my own.
                  </P>
                </Li>
                <Li>
                  <P>
                    It took a lot of time and a lot of effort, but here it is.
                    If you're interested about the rest of my work, you can find
                    it on my{' '}
                    <a href="https://github.com/lukecamelo" style={{ color: '#00a8ff' }}>GitHub page</a>.
                  </P>
                </Li>
                <Li>
                  <P>
                    Enjoy the forums, thanks.
                  </P>
                </Li>
              </Ul>
            </SlideLeft>
            <Link
              to="/subforums"
              className="navlink"
              style={{ width: '150px', margin: '2em auto' }}
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
