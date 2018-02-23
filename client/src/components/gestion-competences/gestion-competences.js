import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompetenceTableau from '../../components/gestion-competences/competenceTableau';
import { connect } from 'react-redux';
import * as competenceActionCreators from '../../store/actions/competence';
import Aux from '../../hoc/Auxil/Auxil';

class GestionCompetences extends Component {
  state = {
    addCompetenceForm: false
  };

  displayAddCompetenceForm = () => {
    this.setState({
      addCompetenceForm: true
    });
  };

  render() {
    let competenceTable;
    if (this.props.selectedDomaine !== '') {
      if (this.props.listCompetences.length > 0) {
        competenceTable = (
          <CompetenceTableau
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            listBody={this.props.listCompetences}
            consulterButton={this.state.consulterButton}
          />
        );
      } else {
        competenceTable = <p>Aucune donnée à afficher</p>;
      }
    }

    return <Aux className="container">pouet{competenceTable}</Aux>;
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

const mapStateToProps = state => {
  return {
    listCompetences: state.competence.listCompetences,
    loadingCompetence: state.competence.loading,
    errorCompetence: state.competence.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(GestionCompetences);
