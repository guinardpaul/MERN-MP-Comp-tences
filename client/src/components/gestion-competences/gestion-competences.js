import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompetenceTableau from './gestion-tableau/competenceTableau';
import { connect } from 'react-redux';
import * as competenceActionCreators from '../../store/actions/competence';
import Aux from '../../hoc/Auxil/Auxil';
import Button from '../UI/Table/Button/Button';
import GestionCompetencesForm from '../gestion-form/gestion-competences-form';
import SelectTreeTable from '../UI/SelectTreeTable/SelectTreeTable';

class GestionCompetences extends Component {
  state = {
    addCompetenceForm: false,
    competence: {}
  };

  displayAddCompetenceForm = () => {
    this.setState({
      addCompetenceForm: true
    });
  };

  cancelForm = () => {
    this.setState({
      addCompetenceForm: false,
      competence: {}
    });
  };

  handleUpdate = competence => {
    console.log('competence: ', competence);
    this.setState({
      competence: competence,
      addCompetenceForm: true
    });
  };

  handleDelete = competence => {
    console.log('competence: ', competence);
    this.props.deleteCompetence(competence._id);
  };

  handleChangeRefCT = event => {};

  handleChangeDescriptionCT = event => {};

  addCompetence = competence => {};

  render() {
    let competence;
    if (this.props.selectedDomaine !== '') {
      if (this.state.addCompetenceForm) {
        competence = (
          <GestionCompetencesForm
            competence={this.state.competence}
            selectedDomaine={this.props.selectedDomaine}
            handleChangeRefCT={this.handleChangeRefCT}
            handleChangeDescriptionCT={this.handleChangeDescriptionCT}
            onFormSubmit={this.addCompetence}
            cancelForm={this.cancelForm}
          />
        );
      } else {
        if (this.props.listCompetences.length > 0) {
          competence = (
            <Aux>
              <Button
                cssClasses={['btn', 'btn-primary']}
                clicked={this.displayAddCompetenceForm}>
                Ajouter
              </Button>
              {/* <SelectTreeTable data={this.props.listCompetences} /> */}

              <CompetenceTableau
                onUpdate={this.handleUpdate}
                onDelete={this.handleDelete}
                data={this.props.listCompetences}
                consulterButton={this.state.consulterButton}
              />
            </Aux>
          );
        } else {
          competence = <p>Aucune donnée à afficher</p>;
        }
      }
    }

    return <Aux className="container">{competence}</Aux>;
  }
}

GestionCompetences.propTypes = {
  addCompetenceForm: PropTypes.bool,
  listCompetences: PropTypes.arrayOf(PropTypes.object)
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GestionCompetences);
