import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CustomScroll from './CustomScroll';
import { useSelector } from "react-redux";
import { setScrollView } from "./store/actions";
import Validate from "./Validate";
import connect from "react-redux/es/connect/connect";

// login
import addMobile    from "./talk/addMobile";
import confirmEmail from "./talk/confirmEmail";
import confirmMobile from "./talk/confirmMobile";
import confirmMobileInApp from "./talk/confirmMobileInApp";
import enterPassword from "./talk/enterPassword";
import index from "./talk/index";
import test from "./talk/test";
import loginAppleBlank from "./talk/loginAppleBlank";
import register from "./talk/register";
import rule from "./talk/rule";
import setPassword from "./talk/setPassword";
import setPasswordOk from "./talk/setPasswordOk";
import updateMobile from "./talk/updateMobile";
import updateMobileApple from "./talk/updateMobileApple";

function App(props) {

  let heightKeyBoard = useSelector(({ scroll }) => scroll.values);

  useEffect(() => {
    if (window.ee) {
      window.ee.addListener('scroll_view', SetSpaceBottom);
      return () => window.ee.removeListener('scroll_view', SetSpaceBottom);
    }
  }, []);

  const SetSpaceBottom = (data) => {
    let heightKeyBoard = CustomScroll.getSpaceBottom(data);
    props.setScrollView(heightKeyBoard)
  };

  let padding = (Validate.getMobileOperatingSystem() !== "iOS") ? heightKeyBoard + 'px' : '0px';
  let transition = heightKeyBoard ? "none" : ".3s ease-in-out";

  return (
    <Router>
      <div style={{ paddingBottom: padding, transition: transition }}>
        <div className="full-page" style={{minHeight: 'unset'}}>
          <Switch>
            {/* login */}
            <Route exact path="/talk/addMobile"           component={addMobile} />
            <Route exact path="/talk/confirmEmail"        component={confirmEmail} />
            <Route exact path="/talk/confirmMobile"       component={confirmMobile} />
            <Route exact path="/talk/confirmMobileInApp"  component={confirmMobileInApp} />
            <Route exact path="/talk/enterPassword"       component={enterPassword} />
            <Route exact path="/talk/index"               component={index} />
            <Route exact path="/talk/test"                component={test} />
            <Route exact path="/"                         component={index} />
            <Route exact path="/talk/loginAppleBlank"     component={loginAppleBlank} />
            <Route exact path="/talk/registerAccount"     component={register} />
            <Route exact path="/talk/rule"                component={rule} />
            <Route exact path="/talk/setPassword"         component={setPassword} />
            <Route exact path="/talk/setPasswordOk"       component={setPasswordOk} />
            <Route exact path="/talk/updateMobile"        component={updateMobile} />
            <Route exact path="/talk/updateMobileApple"   component={updateMobileApple} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScrollView: (data) => {
      dispatch(setScrollView(data))
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
