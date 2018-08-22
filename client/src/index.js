import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import store from './store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import Login from './components/Login'
import Signup from './components/Signup'
import Thread from './containers/Thread';

const theme = {
  primary: '#00a8ff',
  secondary: '#C5E7E2'
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/thread/:id" component={Thread} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()
