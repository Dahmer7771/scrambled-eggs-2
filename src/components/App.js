import React from 'react';
import {
    Route,
    Router,
    Switch,
} from 'react-router-dom';
import history from "../helpers/history";
import HomePage from "./HomePage/HomePage";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import PersonalAccount from "./PersonalAccount/PersonalAccount";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
          <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/registration" component={Registration}/>
              <Route exact path="/personalAccount" component={PersonalAccount}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
