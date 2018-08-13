import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#myNavbar">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <NavLink to="/" exact className="navbar-brand">
              Notes & Compétences
            </NavLink>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li>
                <NavLink
                  activeStyle={{ backgroundColor: 'white' }}
                  to="/"
                  exact>
                  Accueil
                </NavLink>
              </li>
              {/*  Gestion dropdown  */}
              <li className="dropdown">
                <NavLink
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  to="#">
                  Gestion
                  <span className="caret" />
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="gestion-classes">Classes</NavLink>
                  </li>
                  <li>
                    <NavLink to="gestion-eleves">Elèves</NavLink>
                  </li>
                  <li>
                    <NavLink to="gestion-competences">
                      Compétences
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="gestion-evaluations">
                      Evaluations
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="resultats-competences">
                  Ajouter Résultats élèves
                </NavLink>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <NavLink to="login">
                  <span className="glyphicon glyphicon-log-in" /> Se connecter
                </NavLink>
              </li>
              <li>
                <NavLink to="register">
                  <span className="glyphicon glyphicon-user" /> Créer un compte
                </NavLink>
              </li>
              <li>
                <a className="cursor">
                  <span className="glyphicon glyphicon-log-out" /> Se
                  déconnecter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
