import styled from 'styled-components'
import CrumbLink from './CrumbLink'
import Title from './Title'
import Chevron from './Chevron'
import MobileLink from './MobileLink'

const Breadcrumb = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
`

Breadcrumb.CrumbLink = CrumbLink
Breadcrumb.Title = Title
Breadcrumb.Chevron = Chevron
Breadcrumb.MobileLink = MobileLink

export default Breadcrumb
