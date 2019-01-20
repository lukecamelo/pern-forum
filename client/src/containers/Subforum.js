import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchSubforumThreads, fetchData } from '../actions/threadActions'
import ThreadList from './ThreadList'
import Pagination from '../components/Pagination'
import { Banner } from './App'
import { H1, SubforumLink, Container } from '../styled'
import NavBar from '../components/NavBar'
import Loader from '../components/Loader'
import Footer from '../components/Footer'

import styled from 'styled-components'

export const CurrentSub = styled(H1)`
  @media screen and (max-width: 568px) {
    font-size: 1em;
  }
`

const Subforum = props => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [subforumName, setSubforumName] = useState('')

  useEffect(
    () => {
      console.log('hello')
      switch (props.match.params.id) {
        case '1':
          setSubforumName('General Discussion')
          break
        case '2':
          setSubforumName('Video Games')
          break
        default:
          break
      }
      setHasLoaded(true)
    },
    [props.match.params.id]
  )

  const {
    threads,
    match: {
      params: { page, id }
    },
    auth: { isLoggedIn }
  } = props

  if (hasLoaded) {
    return (
      <React.Fragment>
        <Container>
          <NavBar />
          <Banner>
            <div>
              <SubforumLink
                to="/subforums"
                style={{ margin: '0 auto', color: 'white' }}
              >
                Forums
              </SubforumLink>
              <i className="fas fa-angle-right" style={{ margin: '0 6px' }} />
              <CurrentSub
                style={{ margin: '0', color: 'white', display: 'inline' }}
              >
                {subforumName}
              </CurrentSub>
            </div>
          </Banner>
          {/* Takes thread array and uses it to create a paginated ThreadList  */}
          <Pagination
            data={threads}
            currentPage={page}
            context="threads"
            pageSize={15}
            isLoggedIn={isLoggedIn}
            subforumId={id}
          >
            {data => <ThreadList data={data} subforumId={id} />}
          </Pagination>
        </Container>
        <Footer />
      </React.Fragment>
    )
  } else {
    return <Loader />
  }
}

const mapStateToProps = ({ threadData: { threads }, auth }) => ({
  threads,
  auth
})

export default connect(
  mapStateToProps,
  { fetchSubforumThreads, fetchData }
)(Subforum)
