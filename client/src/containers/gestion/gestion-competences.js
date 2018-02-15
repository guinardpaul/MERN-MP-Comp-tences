import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class GestionCompetences extends Component {
  state = {
    addDomaineForm: false
  };

  displayAddDomaineForm = () => {
    this.setState({
      addDomaineForm: true
    });
  };

  render() {
    return (
      <div className="container header">
        <h2 className="page-header ">
          Gestion Competences
          <button
            className="btn btn-primary btn-circle btn-lg margin"
            onClick={this.displayAddDomaineForm}>
            <span className="glyphicon glyphicon-plus" />
          </button>
        </h2>
      </div>
    );
  }
}

GestionCompetences.propTypes = {};

export default GestionCompetences;
