import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Validate from './utilities/Validate'
import CustomScroll from './utilities/CustomScroll'

// import page
import {
  AddMobile,
  ConfirmEmail,
  ConfirmMobileInApp,
  ComfirmMobile,
  EnterPassword,
  Home,
  LoginApple,
  RegisterAccount,
  Rule,
  SetPasswordOk,
  SetPassword,
  UpdateMobileApple,
  UpdateMobile,
} from './pages'

const App = () => {
  return (
    <Router>
      <div>
        <div className='full-page' style={{ minHeight: 'unset' }}>
          <Switch>
            <Route exact path='/talk/addMobile' component={AddMobile} />
            <Route exact path='/talk/confirmEmail' component={ConfirmEmail} />
            <Route exact path='/talk/confirmMobile' component={ComfirmMobile} />
            <Route
              exact
              path='/talk/confirmMobileInApp'
              component={ConfirmMobileInApp}
            />
            <Route exact path='/talk/enterPassword' component={EnterPassword} />
            <Route exact path='/talk/index' component={Home} />
            <Route exact path='/' component={Home} />
            <Route
              exact
              path='/talk/loginAppleBlank'
              component={LoginApple}
            />
            <Route exact path='/talk/registerAccount' component={RegisterAccount} />
            <Route exact path='/talk/rule' component={Rule} />
            <Route exact path='/talk/setPassword' component={SetPassword} />
            <Route exact path='/talk/setPasswordOk' component={SetPasswordOk} />
            <Route exact path='/talk/updateMobile' component={UpdateMobile} />
            <Route
              exact
              path='/talk/updateMobileApple'
              component={UpdateMobileApple}
            />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
