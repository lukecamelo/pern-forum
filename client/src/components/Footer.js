import React from 'react'
import styled from 'styled-components'

const Foot = styled.footer`
  background-color: rgb(162, 167, 177);
  display: flex;
  margin: 0;
  justify-content: center;
`
const InnerFooter = styled.div`
  display: flex;
  width: 75%;
  justify-content: space-between;
  align-items: center;
  padding: 2em 0;
  @media screen and (max-width: 700px) {
    width: 90%;
  }
  > p {
    color: #3d4852;
    padding: 1em 10px;
  }
`
const SocialIcon = styled.a`
  display: inline-block;
  color: #3d4852;
  padding: 1em 10px;
  transition: .2s;
  :hover {
    transform: translateY(2px);
    color: #21262c;
  }
`

const Footer = () => {
  return (
    <Foot>
      <InnerFooter>
        <p style={{ margin: '0' }}>
          Designed & Developed by Luke Camelo &copy; 2018
        </p>
        <div>
          <SocialIcon href="https://github.com/lukecamelo">
            <i className="fab fa-github-alt fa-2x" />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/luke-camelo-a9853a163/">
            <i className="fab fa-linkedin fa-2x" />
          </SocialIcon>
        </div>
      </InnerFooter>
    </Foot>
  )
}

export default Footer
