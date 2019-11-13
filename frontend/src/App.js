import React, {
  useState
} from 'react';
import {Redirect, Router, Route, Switch} from 'react-router-dom';

import './App.css';
import './utils/axios';
import history from './utils/history';
import { AuthContext } from './utils/auth';
import PrivateRoute from './PrivateRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientsPage from './pages/PatientsPage';
import PastPatientsPage from './pages/PastPatientsPage';
import AboutPage from './pages/AboutPage';
import PatientProfilePage from './pages/PatientProfilePage';

function App(props) {
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem('token')
  );

  const setTokens = (u_id, doctor, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("doctor", doctor);
    localStorage.setItem("u_id", u_id);
    setAuthTokens(token);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage}/>
            <PrivateRoute exact path="/patients" component={PatientsPage}/>
            <PrivateRoute exact path="/patients/past" component={PastPatientsPage}/>
            <PrivateRoute path="/patients/:pid" component={PatientProfilePage}/>
            <PrivateRoute path="/about" component={AboutPage}/>
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
