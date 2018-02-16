import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../axios-instance';
import { Domaine } from '../../models/domaine';
import DomaineTableau from '../../components/gestion-competences/domaineTableau';

class GestionCompetences extends Component {
  state = {
    listDomaines: [Domaine],
    isLoaded: false,
    addDomaineForm: false,
    cycles: ['Cycle 3', 'Cycle 4'],
    selectedCycle: ''
  };

  getListDomaineByCycle(cycle) {
    axios
      .get('/domaines/cycle/' + cycle)
      .then(res => {
        console.log(res);
        this.setState({ listDomaines: res.data, isLoaded: true });
      })
      .catch(err => console.log(err));
  }

  displayAddDomaineForm = () => {
    this.setState({
      addDomaineForm: true
    });
  };

  handleChangeSelectedCycle(event) {
    this.setState(
      {
        selectedCycle: event.target.value
      },
      () => {
        if (this.state.selectedCycle !== '') {
          this.getListDomaineByCycle(this.state.selectedCycle);
        }
      }
    );
  }

  render() {
    const options = this.state.cycles.map((cycle, i) => {
      return (
        <option value={cycle} key={i}>
          {cycle}
        </option>
      );
    });

    let domaineTable;
    if (this.state.isLoaded && this.state.selectedCycle !== '') {
      if (this.state.listDomaines.length > 0) {
        domaineTable = (
          <DomaineTableau
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            listBody={this.state.listDomaines}
            consulterButton={this.state.consulterButton}
          />
        );
      } else {
        domaineTable = <p>Aucune donnée à afficher</p>;
      }
    }

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
        <select
          className="form-control select-classe"
          name="cycle"
          id="cycle"
          value={this.state.selectedCycle}
          onChange={event => this.handleChangeSelectedCycle(event)}>
          <option value="">Cycle</option>
          {options}
        </select>
        {domaineTable}
      </div>
    );
  }
}

GestionCompetences.propTypes = {
  addDomaineForm: PropTypes.bool,
  cycles: PropTypes.arrayOf(PropTypes.string),
  selectedCycle: PropTypes.string,
  isLoaded: PropTypes.bool,
  listDomaines: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.element,
  domaineTable: PropTypes.element
};

export default GestionCompetences;
