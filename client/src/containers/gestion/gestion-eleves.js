import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EleveTableau from '../../components/gestion-competences/gestion-tableau/eleveTableau';
import GestionElevesForm from '../../components/gestion-form/gestion-eleves-form';
import './gestion.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/eleve';
import { getAllClassesAsync } from '../../store/actions/classe';
import Select from '../../components/UI/Select/select';

class GestionEleves extends Component {
  state = {
    selectedClasse: '',
    eleve: {
      _id: null,
      nom: '',
      prenom: '',
      classe: ''
    },
    elevesHeader: [
      {
        header: 'Nom',
        accessor: 'nom'
      },
      {
        header: 'Prénom',
        accessor: 'prenom'
      }
    ],
    tableStyle: ['table-striped'],
    rowStyle: [200, 150, 150],
    itemKey: ['nom', 'prenom'],
    addForm: false,
    updateForm: false,
    consulterButton: false,
    selectedRow: null
  };

  componentWillMount() {
    // On recupere la liste des classes pour le select
    this.props.getAllClasses();
    // On recupere la liste des eleves si une classe est sélectionné
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.selectedClasse !== '') {
        this.setState(
          {
            selectedClasse: this.props.location.state.selectedClasse._id
          },
          () => {
            this.props.getAllElevesByClasse(this.state.selectedClasse);
          }
        );
      }
    }
  }

  componentDidMount() {}

  handleChangeSelectedClasse(event) {
    this.setState(
      {
        selectedClasse: event.target.value,
        addForm: false,
        updateForm: false
      },
      () => {
        if (this.state.selectedClasse !== '') {
          this.props.getAllElevesByClasse(this.state.selectedClasse);
        }
      }
    );
  }

  displayAddForm = () => {
    this.setState({
      addForm: true,
      updateForm: false,
      eleve: {
        nom: '',
        prenom: '',
        classe: this.state.selectedClasse
      },
      selectedRow: null
    });
  };

  onCancelForm = () => {
    this.setState({
      addForm: false,
      updateForm: false,
      selectedRow: null
    });
  };

  handleChangeNomEleve(event) {
    const newEleve = {
      ...this.state.eleve
    };
    this.setState({
      eleve: {
        _id: newEleve._id,
        nom: event.target.value,
        prenom: newEleve.prenom,
        classe: newEleve.classe
      }
    });
  }

  handleChangePrenomEleve(event) {
    const newEleve = {
      ...this.state.eleve
    };
    this.setState({
      eleve: {
        _id: newEleve._id,
        nom: newEleve.nom,
        prenom: event.target.value,
        classe: newEleve.classe
      }
    });
  }

  handleChangeClasse(event) {
    const newEleve = {
      ...this.state.eleve
    };
    this.setState({
      eleve: {
        _id: newEleve._id,
        nom: newEleve.nom,
        prenom: newEleve.prenom,
        classe: event.target.value
      },
      selectedRow: null
    });
  }

  handleSubmit = eleve => {
    if (this.state.addForm && this.state.eleve._id === undefined) {
      this.props.addEleve(eleve);
      if (!this.props.loading) {
        this.setState({
          addForm: false,
          updateForm: false,
          eleve: {
            _id: null,
            nom: '',
            prenom: '',
            classe: ''
          }
        });
      }
    } else {
      this.props.updateEleve(eleve);
      if (!this.props.loading) {
        this.setState({
          addForm: false,
          updateForm: false,
          eleve: {
            _id: null,
            nom: '',
            prenom: '',
            classe: ''
          }
        });
      }
    }
  };

  handleUpdate = obj => {
    this.setState(
      {
        eleve: obj,
        updateForm: true,
        addForm: false
      },
      () => {
        this.handleSelectRowChanged(obj);
      }
    );
  };

  handleDelete = eleve => {
    this.props.deleteEleve(eleve._id);
  };

  handleSelectRowChanged = obj => {
    this.setState({
      selectedRow: obj
    });
  };

  render() {
    let eleveForm = null;
    if (this.state.addForm) {
      eleveForm = (
        <GestionElevesForm
          onFormSubmit={this.handleSubmit}
          addForm={this.state.addForm}
          styleForm="panel-info"
          headingForm="Création élève"
          buttonStyle="btn btn-success"
          buttonName="Sauver"
          eleve={this.state.eleve}
          listClasses={this.props.listClasses}
          selectedClasse={this.state.selectedClasse}
          cancelForm={this.onCancelForm}
          handleChangeNomEleve={event => this.handleChangeNomEleve(event)}
          handleChangePrenomEleve={event => this.handleChangePrenomEleve(event)}
          handleChangeClasse={event => this.handleChangeClasse(event)}
        />
      );
    } else if (this.state.updateForm) {
      eleveForm = (
        <GestionElevesForm
          onFormSubmit={this.handleSubmit}
          addForm={this.state.addForm}
          styleForm="panel-warning"
          headingForm="Modification élève"
          buttonStyle="btn btn-warning"
          buttonName="Modifier"
          eleve={this.state.eleve}
          listClasses={this.props.listClasses}
          selectedClasse={this.state.selectedClasse}
          cancelForm={this.onCancelForm}
          handleChangeNomEleve={event => this.handleChangeNomEleve(event)}
          handleChangePrenomEleve={event => this.handleChangePrenomEleve(event)}
          handleChangeClasse={event => this.handleChangeClasse(event)}
        />
      );
    }

    let addButon = null;
    if (this.state.selectedClasse !== '') {
      addButon = (
        <button
          className="btn btn-primary btn-circle btn-lg margin"
          onClick={this.displayAddForm}>
          <span className="glyphicon glyphicon-plus" />
        </button>
      );
    }

    // Select classe
    let selectClasse = <Spinner />;
    if (!this.props.loadingClasses) {
      let options = this.props.listClasses.map((c, i) => {
        return (
          <option value={c._id} key={i}>
            {' '}
            {c.nom_classe}{' '}
          </option>
        );
      });
      const cssClasses = ['form-control', 'select-classe'];
      selectClasse = (
        <select
          className="form-control select-classe"
          name="classe"
          id="classe"
          value={this.state.selectedClasse}
          onChange={event => this.handleChangeSelectedClasse(event)}>
          <option value=""> Classe </option> {options}{' '}
        </select>
      );
    }

    let data = <Spinner />;
    if (this.state.selectedClasse !== '') {
      if (!this.props.loadingEleves) {
        if (this.props.listEleves.length > 0) {
          data = (
            <EleveTableau
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
              data={this.props.listEleves}
              consulterButton={this.state.consulterButton}
              selectedRow={this.state.selectedRow}
            />
          );
        } else {
          data = <p> Aucune donnée à afficher </p>;
        }
      }
    } else {
      data = <p> Sélectionnez une classe pour commencer </p>;
    }

    return (
      <div className="container header">
        <h2 className="page-header">Gestion élèves {addButon} </h2>{' '}
        {selectClasse}{' '}
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12"> {data} </div>{' '}
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">
          {' '}
          {eleveForm}{' '}
        </div>{' '}
      </div>
    );
  }
}

GestionEleves.propTypes = {
  listEleves: PropTypes.array,
  listClasses: PropTypes.array,
  eleve: PropTypes.object,
  selectedClasse: PropTypes.string,
  elevesHeader: PropTypes.arrayOf(PropTypes.string),
  tableStyle: PropTypes.arrayOf(PropTypes.string),
  rowStyle: PropTypes.arrayOf(PropTypes.number),
  itemKey: PropTypes.arrayOf(PropTypes.string),
  addForm: PropTypes.bool,
  updateForm: PropTypes.bool,
  consulterButton: PropTypes.bool,
  loadingClasses: PropTypes.bool,
  loadingData: PropTypes.bool,
  addButon: PropTypes.element,
  selectClasse: PropTypes.element,
  data: PropTypes.element,
  eleveForm: PropTypes.element,
  options: PropTypes.element
};

const mapStateToProps = state => {
  return {
    listEleves: state.eleve.listEleves,
    listClasses: state.classe.listClasses,
    loadingClasses: state.classe.loading,
    loadingEleve: state.eleve.loading,
    error: state.eleve.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllClasses: () => dispatch(getAllClassesAsync()),
    getAllEleves: () => dispatch(actionCreator.getAllElevesAsync()),
    getAllElevesByClasse: id_classe =>
      dispatch(actionCreator.getElevesByClasseAsync(id_classe)),
    addEleve: eleve => dispatch(actionCreator.addEleveAsync(eleve)),
    updateEleve: eleve => dispatch(actionCreator.updateEleveAsync(eleve)),
    deleteEleve: id_eleve => dispatch(actionCreator.deleteEleveAsync(id_eleve))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GestionEleves);
