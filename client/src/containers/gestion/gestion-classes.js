import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tableau from '../../components/UI/Table/Tableau';
import ClasseTableau from '../../components/gestion/gestion-tableau/classeTableau';
import GestionClassesForm from '../../components/gestion/gestion-form/gestion-classes-form';
import './gestion.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreator from '../../store/actions/index';
import { connect } from 'react-redux';
import Modal from '../../components/UI/Modal/Modal';
import ConfirmDelete from '../../components/gestion/gestion-form/confirm-delete';

class GestionClasses extends Component {
  state = {
    error: {},
    classe: {},
    addForm: false,
    updateForm: false,
    consulterButton: false,
    selectedRow: null,
    confirmDelete: false
  };

  componentDidMount() {
    this.props.getAllClasses();
  }

  displayAddForm = () => {
    this.setState({
      addForm: true,
      updateForm: false,
      classe: {
        name: '',
        enumCycleId: ''
      },
      selectedRow: null
    });
  };

  handleSubmit = obj => {
    console.log('obj: ', obj);
    if (this.state.addForm) {
      this.props.addClasse(obj);
      if (!this.props.loading) {
        this.setState({
          addForm: false,
          updateForm: false
        });
      }
    } else {
      this.props.updateClasse(obj);
      if (!this.props.loading) {
        this.setState({
          addForm: false,
          updateForm: false
        });
      }
    }
  };

  handleUpdate = obj => {
    this.setState(
      {
        classe: obj,
        updateForm: true,
        addForm: false
      },
      () => {
        this.handleSelectRowChanged(obj);
      }
    );
  };

  handleDelete = obj => {
    this.setState({ confirmDelete: true, classe: obj });
  };

  cancelConfirmDelete = () => {
    this.setState({ confirmDelete: false, classe: {} });
  };

  deleteClasse = () => {
    this.props.deleteClasse(this.state.classe.id);
    this.setState({ confirmDelete: false, classe: {} });
  };

  handleRedirectToEleveList = obj => {
    this.props.history.push({
      pathname: '/gestion-eleves',
      state: {
        selectedClasse: obj
      }
    });
  };

  handleSelectRowChanged = obj => {
    this.setState({
      selectedRow: obj
    });
  };

  onCancelForm = () => {
    this.setState({
      addForm: false,
      updateForm: false,
      classe: {},
      selectedRow: null
    });
  };

  handleChangeNomClasse = event => {
    const newState = Object.assign({}, this.state.classe);

    this.setState({
      classe: {
        id: newState.id,
        name: event.target.value,
        enumCycleId: newState.enumCycleId
      }
    });
  };

  handleChangeCycle = event => {
    const newState = this.state.classe;
    this.setState({
      classe: {
        id: newState.id,
        name: newState.name,
        enumCycleId: parseInt(event.target.value, 10)
      }
    });
  };

  render() {
    let classeForm = null;
    if (this.state.addForm) {
      classeForm = (
        <GestionClassesForm
          onFormSubmit={this.handleSubmit}
          styleForm="panel-info"
          headingForm="Création classe"
          buttonStyle="btn btn-success"
          buttonName="Sauver"
          classe={this.state.classe}
          cancelForm={this.onCancelForm}
          handleChangeNomClasse={event => this.handleChangeNomClasse(event)}
          handleChangeCycle={event => this.handleChangeCycle(event)}
        />
      );
    } else if (this.state.updateForm) {
      classeForm = (
        <GestionClassesForm
          onFormSubmit={this.handleSubmit}
          styleForm="panel-warning"
          headingForm="Modification classe"
          buttonStyle="btn btn-warning"
          buttonName="Modifier"
          classe={this.state.classe}
          cancelForm={this.onCancelForm}
          handleChangeNomClasse={event => this.handleChangeNomClasse(event)}
          handleChangeCycle={event => this.handleChangeCycle(event)}
        />
      );
    } else if (
      this.props.error &&
      (this.state.addForm || this.state.updateForm)
    ) {
      classeForm = this.props.error.message;
    }

    let table = <Spinner />;
    // Loading for addClasse and getAllClasses identique. Besoin de les découpler pour que la vérification soit bonne.
    if (!this.props.loading) {
      if (this.props.listClasses.length > 0) {
        table = (
          <ClasseTableau
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            onConsulter={this.handleRedirectToEleveList}
            data={this.props.listClasses}
            consulterButton={this.state.consulterButton}
            selectedRow={this.state.selectedRow}
          />
        );
      } else {
        table = <p>Aucune donnée à afficher.</p>;
      }
    } else {
      table = <p>Erreur lors de la récupération des Classes au serveur.</p>;
    }

    return (
      <div className="container header">
        <h2 className="page-header ">
          Gestion classes
          <button
            className="btn btn-primary btn-circle btn-lg margin"
            onClick={this.displayAddForm}>
            <span className="glyphicon glyphicon-plus" />
          </button>
        </h2>
        <ConfirmDelete
          cancelConfirmDelete={this.cancelConfirmDelete}
          showConfirmDelete={this.state.confirmDelete}
          objectName={this.state.classe.name}
          onDelete={this.deleteClasse}
        />
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">{table}</div>
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">{classeForm}</div>
      </div>
    );
  }
}

GestionClasses.propTypes = {
  listClasses: PropTypes.arrayOf(PropTypes.object),
  classe: PropTypes.object,
  classesHeader: PropTypes.arrayOf(PropTypes.string),
  tableStyle: PropTypes.string,
  itemKey: PropTypes.arrayOf(PropTypes.string),
  consulterButton: PropTypes.bool,
  addForm: PropTypes.bool,
  updateForm: PropTypes.bool,
  classeForm: PropTypes.element,
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    listClasses: state.classe.listClasses,
    loading: state.classe.loading,
    error: state.classe.error,
    classe: state.classe.classe
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllClasses: () => dispatch(actionCreator.getAllClassesAsync()),
    addClasse: classe => dispatch(actionCreator.addClasseAsync(classe)),
    updateClasse: classe => dispatch(actionCreator.updateClasseAsync(classe)),
    deleteClasse: id_classe =>
      dispatch(actionCreator.deleteClasseAsync(id_classe))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GestionClasses);
