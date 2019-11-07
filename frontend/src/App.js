import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import './App.css';
import './utils/axios';
import history from './utils/history';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientsPage from './pages/PatientsPage';
import AboutPage from './pages/AboutPage';
import PatientProfilePage from './pages/PatientProfilePage';
function App() {
  return (
    <div className="App">
     <Router history={history}>
       <Switch>
        <Route exact path="/login"          component={LoginPage} />
        <Route exact path="/register"       render={RegisterPage}/>
        <Route exact path="/patients"       render={PatientsPage}/>
        <Route exact path="/patients/:pid"  render={PatientProfilePage}/>
        <Route exact path="/about"          render={AboutPage}/>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
