import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand" >MP-CT</Link>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">

            <ul className="nav navbar-nav">
              <li >
                <Link to="/">Home</Link>
              </li>
              {/*  Gestion dropdown  */}
              <li className="dropdown"  >
                <Link className="dropdown-toggle" data-toggle="dropdown" to="#">Gestion
            <span className="caret"></span>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="gestion-classes">Gestion classes</Link>
                  </li>
                  <li>
                    <Link to="gestion-eleves">Gestion élèves</Link>
                  </li>
                  <li>
                    <Link to="gestion-competences">Gestion compétences</Link>
                  </li>
                </ul>
              </li>
              <li >
                <Link to="resultats-competences">Ajouter Résultats élèves</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li >
                <Link to="login">
                  <span className="glyphicon glyphicon-log-in"></span> Se connecter
                </Link>
              </li>
              <li >
                <Link to="register">
                  <span className="glyphicon glyphicon-user"></span> Créer un compte
                </Link>
              </li>
              <li>
                <a className="cursor" >
                  <span className="glyphicon glyphicon-log-out"></span> Se déconnecter
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