import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/navbar';
import GestionClasses from './components/gestion/gestion-classes';
import GestionEleves from './components/gestion/gestion-eleves';
import GestionCompetences from './components/gestion/gestion-competences';
import Login from './components/authentication/login';
import Register from './components/authentication/register';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <br /><br />
          <Route exact path="/" component={GestionClasses} />
          <Route path="/gestion-classes" component={GestionClasses} />
          <Route path="/gestion-eleves" component={GestionEleves} />
          <Route path="/gestion-competences" component={GestionCompetences} />
          <Route path="/resultats-competences" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
