import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './gestion.css';
import * as actionCreator from '../../store/actions/evaluation';
import { getAllClassesAsync } from '../../store/actions/classe';
import { getEnumTrimestresAsync } from '../../store/actions/enums';
import { getAllCompetencesAsync } from '../../store/actions/competence';
import EvaluationTableau from '../../components/gestion/gestion-tableau/evaluationTableau';
import EvaluationForm from '../../components/gestion/gestion-form/evaluation-form';

class GestionEvaluation extends Component {
  state = {
    selectedClasse: '',
    selectedCycle: '',
    listEvaluations: [],
    listCompetences: [],
    selectedCompetences: [],
    evaluation: {
      id: null,
      description: '',
      created_at: '',
      classe_id: null,
      cycle_id: null,
      trimestre_id: ''
    },
    addForm: false,
    updateForm: false,
    selectedRow: null
  };

  componentWillMount() {
    this.props.getAllClasses();
    this.props.getAllEvaluations();
    this.props.getAllCompetences();
    this.props.getEnumTrimestre();
  }

  handleChangeSelectedClasse(event) {
    let cycle_id = 0;
    this.props.listClasses.forEach(c => {
      if (c.id === parseInt(event.target.value, 10)) {
        cycle_id = c.cycle_id;
      }
    });

    const competenceFiltered = [...this.props.listCompetences].filter(
      ct => ct.cycle_id === cycle_id
    );

    this.setState(
      {
        selectedClasse: event.target.value,
        selectedCycle: cycle_id,
        listCompetences: competenceFiltered,
        addForm: false,
        updateForm: false
      },
      () => {
        console.log(this.state.listCompetences);
        if (this.state.selectedClasse !== '') {
          this.filterList(this.state.selectedClasse);
        }
      }
    );
  }

  filterList = selectedClasse => {
    this.setState({
      listEvaluations: this.props.listEvaluations.filter(
        e => e.classe_id === parseInt(selectedClasse, 10)
      ),
      selectedClasse: selectedClasse,
      evaluation: {
        id: null,
        description: '',
        created_at: '',
        classe_id: parseInt(selectedClasse, 10),
        cycle_id: this.state.selectedCycle,
        trimestre_id: ''
      }
    });
  };

  displayAddForm = () => {
    this.setState({
      addForm: true,
      updateForm: false,
      evaluation: {
        id: null,
        description: '',
        created_at: '',
        classe_id: parseInt(this.state.selectedClasse, 10),
        cycle_id: this.state.selectedCycle,
        trimestre_id: ''
      }
    });
  };

  handleUpdate = obj => {
    this.setState({
      evaluation: obj,
      updateForm: true
    });
  };

  handleDelete = obj => {};

  handleChangeDescription = event => {
    const prevState = { ...this.state.evaluation };
    this.setState({
      evaluation: {
        ...prevState,
        description: event.target.value
      }
    });
  };

  handleChangeCreatedAt = event => {
    const prevState = { ...this.state.evaluation };
    this.setState({
      evaluation: {
        ...prevState,
        created_at: event.target.value
      }
    });
  };

  handleChangeTrimestre = event => {
    const prevState = { ...this.state.evaluation };
    this.setState({
      evaluation: {
        ...prevState,
        trimestre_id: parseInt(event.target.value, 10)
      }
    });
  };

  handleChangeCompetence = selectedCompetences => {
    this.setState(
      {
        selectedCompetences: [...selectedCompetences]
      },
      () => console.log(this.state.selectedCompetences)
    );
  };

  handleSubmit = obj => {
    console.log('obj:', obj);
  };

  onCancelForm = () => {
    this.setState({
      evaluation: {
        id: null,
        description: '',
        created_at: '',
        classe_id: parseInt(this.state.selectedClasse, 10),
        cycle_id: this.state.selectedCycle,
        trimestre_id: ''
      },
      addForm: false,
      updateForm: false
    });
  };

  render() {
    const options = this.props.listClasses.map((c, i) => {
      return (
        <option value={c.id} key={i}>
          {c.name}
        </option>
      );
    });

    let form = null;
    if (this.state.addForm) {
      form = (
        <EvaluationForm
          onFormSubmit={this.handleSubmit}
          styleForm="panel-info"
          headingForm="Création Evaluation"
          buttonStyle="btn btn-info"
          buttonName="Créer"
          evaluation={this.state.evaluation}
          enumTrimestres={this.props.enumTrimestres}
          listCompetences={this.state.listCompetences}
          selectedCompetences={this.state.selectedCompetences}
          cancelForm={this.onCancelForm}
          handleChangeDescription={event => this.handleChangeDescription(event)}
          handleChangeCreatedAt={event => this.handleChangeCreatedAt(event)}
          handleChangeTrimestre={event => this.handleChangeTrimestre(event)}
          handleChangeCompetence={this.handleChangeCompetence}
        />
      );
    } else if (this.state.updateForm) {
      form = (
        <EvaluationForm
          onFormSubmit={this.handleSubmit}
          styleForm="panel-warning"
          headingForm="Modification Evaluation"
          buttonStyle="btn btn-warning"
          buttonName="Modifier"
          evaluation={this.state.evaluation}
          enumTrimestres={this.props.enumTrimestres}
          listCompetences={this.state.listCompetences}
          selectedCompetences={this.state.selectedCompetences}
          cancelForm={this.onCancelForm}
          handleChangeDescription={event => this.handleChangeDescription(event)}
          handleChangeCreatedAt={event => this.handleChangeCreatedAt(event)}
          handleChangeTrimestre={event => this.handleChangeTrimestre(event)}
          handleChangeCompetence={event => this.handleChangeCompetence(event)}
        />
      );
    }

    return (
      <div className="container header">
        <h2 className="page-header">
          Gestion évaluations
          {this.state.selectedClasse !== '' ? (
            <button
              className="btn btn-primary btn-circle btn-lg margin"
              onClick={this.displayAddForm}>
              <span className="glyphicon glyphicon-plus" />
            </button>
          ) : null}
        </h2>
        <select
          className="form-control select-classe"
          name="classe_id"
          id="classe_id"
          value={this.state.selectedClasse}
          onChange={event => this.handleChangeSelectedClasse(event)}>
          <option value="">Classe</option>
          {options}
        </select>
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">
          {this.state.selectedClasse !== '' ? (
            <EvaluationTableau
              data={this.state.listEvaluations}
              selectedRow={this.state.selectedRow}
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
            />
          ) : null}
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">{form}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listEvaluations: state.evaluation.listEvaluations,
    loadingEvaluation: state.evaluation.loading,
    error: state.evaluation.error,
    listClasses: state.classe.listClasses,
    enumTrimestres: state.enums.enumTrimestres,
    listCompetences: state.competence.listCompetences
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllClasses: () => dispatch(getAllClassesAsync()),
    getEnumTrimestre: () => dispatch(getEnumTrimestresAsync()),
    getAllEvaluations: () => dispatch(actionCreator.getAllEvaluationsAsync()),
    getAllCompetences: () => dispatch(getAllCompetencesAsync()),
    addEvaluation: evaluation =>
      dispatch(actionCreator.addEvaluationAsync(evaluation)),
    updateEvaluation: evaluation =>
      dispatch(actionCreator.updateEvaluationAsync(evaluation)),
    deleteEvaluation: id => dispatch(actionCreator.deleteEvaluationAsync(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GestionEvaluation);
