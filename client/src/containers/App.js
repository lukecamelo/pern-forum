import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/threadActions'
import { checkUserLoggedIn } from '../actions/authActions'
import { Link } from 'react-router-dom'

import { H1 } from '../components/Login'
import { Card } from '../components/UserControlPanel'
import { Container } from '../styled/index'
import { FadeIn, SlideTop } from '../styled/animations'
import NavBar from '../components/NavBar'
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import styled from 'styled-components'
import SubforumList from './SubforumList'

export const NewThreadLink = styled(Link)`
  color: #0266c8;
  background-color: white;
  text-decoration: none;
  padding: 14px;
  transition: 0.2s;
  border: 2px solid #0266c8;
  font-family: 'Roboto', sans-serif;
  box-shadow: ${props => props.theme.smallShadow};
  &:hover {
    box-shadow: none;
    transform: translateY(2px);
    background-color: #0266c8;
    color: white;
  }
`
export const Banner = styled.div`
  width: 75%;
  margin: 0 auto;
  background-color: #0266c8;
  color: white;
  margin: 2em auto 0 auto;
  padding: 1em 0 1em 1em;
  box-shadow: ${props => props.theme.largeShadow};
  @media screen and (max-width: 700px) {
    width: 90%;
  }
`

export const App = ({ isLoggedIn, ...props }) => {
  const [hasLoaded, setHasLoaded] = useState(false)

  function useUserData() {
    props.fetchData()
    setHasLoaded(true)
  }

  useEffect(() => {
    useUserData()
  }, [])

  if (hasLoaded) {
    return (
      <React.Fragment>
        <Container>
          <NavBar isHome={true} />
          <FadeIn>
            <SubforumList />
          </FadeIn>
        </Container>
        <Footer />
      </React.Fragment>
    )
  } else if (!isLoggedIn && hasLoaded) {
    return (
      <Container>
        <NavBar />
        <FadeIn>
          <Card>
            <SlideTop>
              <H1>Please log in to view threads.</H1>
            </SlideTop>
          </Card>
        </FadeIn>
        <Footer />
      </Container>
    )
  } else if (isLoggedIn && !hasLoaded) {
    return (
      <React.Fragment>
        <Container>
          <NavBar />
          <Loader />
        </Container>
        <Footer />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Container>
          <NavBar />
          <Loader />
        </Container>
        <Footer />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  threads: state.threadData.threads
})

export default connect(
  mapStateToProps,
  { fetchData, checkUserLoggedIn }
)(App)
