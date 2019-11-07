import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import './App.css';
import './utils/axios';
import history from './utils/history';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientsPage from './pages/PatientsPage';
import AboutPage from './pages/AboutPage';
function App() {
  return (
    <div className="App">
     <Router history={history}>
       <Switch>
        <Route exact path="/login"    render={(props) => {return <LoginPage />}}/>
        <Route exact path="/register" render={(props) => {return <RegisterPage />}}/>
        <Route exact path="/patients" render={(props) => {return <PatientsPage />}}/>
        <Route exact path="/about"    render={(props) => {return <AboutPage />}}/>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
