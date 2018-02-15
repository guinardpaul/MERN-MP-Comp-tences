import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GestionClasses from './gestion/gestion-classes';
import GestionEleves from './gestion/gestion-eleves';
import GestionCompetences from './gestion/gestion-competences';
import Login from '../components/authentication/login';
import Register from '../components/authentication/register';
import Layout from '../hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={GestionClasses} />
          <Route path="/gestion-classes" component={GestionClasses} />
          <Route path="/gestion-eleves" component={GestionEleves} />
          <Route path="/gestion-competences" component={GestionCompetences} />
          <Route path="/resultats-competences" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Layout>
      </Router>
    );
  }
}

export default App;
