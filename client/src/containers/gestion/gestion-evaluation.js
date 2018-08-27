import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './gestion.css';
import * as actionCreator from '../../store/actions/evaluation';
import { getAllClassesAsync } from '../../store/actions/classe';
import { getEnumTrimestresAsync } from '../../store/actions/enums';
import EvaluationTableau from '../../components/gestion-competences/gestion-tableau/evaluationTableau';
import EvaluationForm from '../../components/gestion-form/evaluation-form';

class GestionEvaluation extends Component {
  state = {
    selectedClasse: '',
    listEvaluations: [],
    evaluation: {},
    addForm: false,
    updateForm: false,
    selectedRow: null
  };

  componentWillMount() {
    this.props.getAllClasses();
    this.props.getAllEvaluations();
    this.props.getEnumTrimestre();
  }

  handleChangeSelectedClasse(event) {
    this.setState(
      {
        selectedClasse: event.target.value,
        addForm: false,
        updateForm: false
      },
      () => {
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
      )
    });
  };

  displayAddForm = () => {
    this.setState({ addForm: true, updateForm: false, evaluation: {} });
  };

  handleUpdate = obj => {};
  handleDelete = obj => {};

  handleChangeDescription = event => {};
  handleChangeCreatedAt = event => {};
  handleChangeTrimestre = event => {};
  onCancelForm = () => {};

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
          eleve={this.state.eleve}
          enumTrimestres={this.props.enumTrimestres}
          cancelForm={this.onCancelForm}
          handleChangeDescription={event => this.handleChangeDescription(event)}
          handleChangeCreatedAt={event => this.handleChangeCreatedAt(event)}
          handleChangeTrimestre={event => this.handleChangeTrimestre(event)}
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
          eleve={this.state.eleve}
          enumTrimestres={this.props.enumTrimestres}
          cancelForm={this.onCancelForm}
          handleChangeDescription={event => this.handleChangeDescription(event)}
          handleChangeCreatedAt={event => this.handleChangeCreatedAt(event)}
          handleChangeTrimestre={event => this.handleChangeTrimestre(event)}
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
    enumTrimestres: state.enums.enumTrimestres
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllClasses: () => dispatch(getAllClassesAsync()),
    getEnumTrimestre: () => dispatch(getEnumTrimestresAsync()),
    getAllEvaluations: () => dispatch(actionCreator.getAllEvaluationsAsync()),
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
