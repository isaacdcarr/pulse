import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import PatientList from './pages/PatientList';
import AboutPage from './pages/AboutPage';
import PatientProfile from './pages/PatientProfile';
import NavBar from './NavBar';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <div id="page-body">
          <Route path="/" component={HomePage} exact />
          <Route path="/patients" component={PatientList} />
          <Route path="/patients/:id" component={PatientProfile} />
          <Route path="/about" component={AboutPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
