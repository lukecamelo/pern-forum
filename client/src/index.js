import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import store from './store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css'
import App from './containers/App'
import Login from './components/Login'
import Signup from './components/Signup'
import Thread from './containers/Thread'
import ThreadForm from './components/ThreadForm'
import UserControlPanel from './components/UserControlPanel'
import EditPostModal from './components/EditPostModal'
import Landing from './components/Landing'
import Subforum from './containers/Subforum'

// Allows me to pass around predefined CSS properties
const theme = {
  primary: '#00a8ff',
  secondary: '#0266c8',
  largeShadow: `
    0 15px 30px 0 rgba(0,0,0,0.11),
    0 5px 15px 0 rgba(0,0,0,0.08)
  `,
  mediumShadow: `
    0 4px 8px 0 rgba(0,0,0,0.12),
    0 2px 4px 0 rgba(0,0,0,0.08)
  `,
  smallShadow: `
    0 2px 4px 0 rgba(0,0,0,0.10)
  `,
  fadeInBezier: 'cubic-bezier(0.52, 0.79, 0.3, 0.98)',
  slideInBezier: 'cubic-bezier(0.28, 1, 0.14, 0.99)'
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/thread/:id/page/:page" component={Thread} />
          <Route exact path="/editpost" component={EditPostModal} />
          <Route exact path="/subforum/:id/newthread" component={ThreadForm} />
          <Route exact path="/usercontrolpanel" component={UserControlPanel} />
          <Route path="/subforum/:id/page/:page" component={Subforum} />
          <Route path="/subforums" component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
