import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DomaineTableau from './gestion-tableau/domaineTableau';
import { connect } from 'react-redux';
import * as domaineActionCreators from '../../store/actions/domaine';
import * as competenceActionCreators from '../../store/actions/competence';
import Aux from '../../hoc/Auxil/Auxil';

class GestionDomaines extends Component {
  state = {
    addDomaineForm: false,
    cycles: ['Cycle 3', 'Cycle 4'],
    selectedCycle: ''
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

  handleSelectDomaine = obj => {
    this.props.selectDomaine(obj);
  };

  handleUpdate = domaine => {
    console.log('domaine: ', domaine);
  };

  handleDelete = domaine => {
    console.log('domaine: ', domaine);
  };

  render() {
    let domaineTable;
    if (this.props.selectedCycle !== '') {
      if (this.props.listDomaines.length > 0) {
        domaineTable = (
          <DomaineTableau
            onConsulter={this.handleSelectDomaine}
            consulterButton={this.state.consulterButton}
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            listBody={this.props.listDomaines}
            btnStyle
          />
        );
      } else {
        domaineTable = <p>Aucune donnée à afficher</p>;
      }
    }

    return <Aux className="container">{domaineTable}</Aux>;
  }
}

GestionDomaines.propTypes = {
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
    listCompetences: state.competence.listCompetences,
    loadingCompetence: state.competence.loading,
    errorCompetence: state.competence.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDomaine: domaine =>
      dispatch(domaineActionCreators.addDomaineAsync(domaine)),
    updateDomaine: domaine =>
      dispatch(domaineActionCreators.updateDomaineAsync(domaine)),
    deleteDomaine: id_domaine =>
      dispatch(domaineActionCreators.deleteDomaineAsync(id_domaine)),
    getCompetencesByDomaine: id_domaine =>
      dispatch(
        competenceActionCreators.getAllCompetencesByDomaineAsync(id_domaine)
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GestionDomaines);
