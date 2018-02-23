import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DomaineTableau from '../../components/gestion-competences/domaineTableau';
import { connect } from 'react-redux';
import * as domaineActionCreators from '../../store/actions/domaine';
import * as competenceActionCreators from '../../store/actions/competence';
import GestionDomaines from '../../components/gestion-competences/gestion-domaines';
import GestionCompetences from '../../components/gestion-competences/gestion-competences';

class GestionDomainesCompetences extends Component {
  state = {
    addDomaineForm: false,
    cycles: ['Cycle 3', 'Cycle 4'],
    selectedCycle: '',
    selectedDomaine: ''
  };

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
          this.props.getAllDomainesByCycle(this.state.selectedCycle);
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
    if (!this.props.loadingDomaine && this.state.selectedCycle !== '') {
      if (this.props.listDomaines.length > 0) {
        domaineTable = (
          <DomaineTableau
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            listBody={this.props.listDomaines}
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
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <GestionDomaines
              selectedCycle={this.state.selectedCycle}
              listDomaines={this.props.listDomaines}
            />
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            <GestionCompetences
              selectedDomaine={this.state.selectedDomaine}
              listCompetences={this.props.listCompetences}
            />
          </div>
        </div>
      </div>
    );
  }
}

GestionDomainesCompetences.propTypes = {
  addDomaineForm: PropTypes.bool,
  cycles: PropTypes.arrayOf(PropTypes.string),
  selectedCycle: PropTypes.string,
  isLoaded: PropTypes.bool,
  listDomaines: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.element,
  domaineTable: PropTypes.element
};

const mapStateToProps = state => {
  return {
    listDomaines: state.domaine.listDomaines,
    listCompetences: state.competence.listCompetences,
    loadingDomaine: state.domaine.loading,
    loadingCompetence: state.competence.loading,
    errorCompetence: state.competence.error,
    errorDomaine: state.domaine.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllDomaines: () => dispatch(domaineActionCreators.getAllDomainesAsync()),
    getAllDomainesByCycle: cycle =>
      dispatch(domaineActionCreators.getAllDomainesByCycleAsync(cycle)),
    addDomaine: domaine =>
      dispatch(domaineActionCreators.addDomaineAsync(domaine)),
    updateDomaine: domaine =>
      dispatch(domaineActionCreators.updateDomaineAsync(domaine)),
    deleteDomaine: id_domaine =>
      dispatch(domaineActionCreators.deleteDomaineAsync(id_domaine)),
    getCompetencesByDomaine: id_domaine =>
      dispatch(
        competenceActionCreators.getAllCompetencesByDomaineAsync(id_domaine)
      ),
    addCompetence: competence =>
      dispatch(competenceActionCreators.addCompetenceAsync(competence)),
    updateCompetence: competence =>
      dispatch(competenceActionCreators.updateCompetenceAsync(competence)),
    deleteCompetence: id_competence =>
      dispatch(competenceActionCreators.deleteCompetenceAsync(id_competence))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GestionDomainesCompetences
);
