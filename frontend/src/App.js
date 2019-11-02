import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <div className="App">
     <Router>
       <Switch>
        <Route exact path="/login" render={(props) => {
          return <LoginPage />
        }}
        />
        <Route exact path="/register" render={(props) => {
          return <RegisterPage />
        }}
        />
       </Switch>
     </Router>
    </div>
  );
}

export default App;
