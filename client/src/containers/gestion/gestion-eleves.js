import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tableau from '../../components/UI/Table/Tableau';
import GestionElevesForm from '../../components/gestion-form/gestion-eleves-form';
import './gestion.css';
import axios from '../../axios-instance';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Eleve } from '../../models/eleve';

class GestionEleves extends Component {
  state = {
    listEleves: [Eleve],
    listClasses: [],
    selectedClasse: '',
    eleve: { _id: null, nom: '', prenom: '', classe: '' },
    elevesHeader: ['Nom', 'Prénom'],
    tableStyle: 'table table-striped',
    rowStyle: [200, 150, 150],
    itemKey: ['nom', 'prenom'],
    addForm: false,
    updateForm: false,
    consulterButton: false,
    loadingData: true,
    loadingClasses: true
  };

  componentDidMount() {
    this.getListClasses();
  }

  getListClasses() {
    axios
      .get('/classes')
      .then(res => {
        this.setState({
          listClasses: res.data,
          loadingClasses: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getListElevesByClasse(id_classe) {
    axios
      .get('/eleves/classe/' + id_classe)
      .then(res => {
        this.setState({
          listEleves: res.data,
          loadingData: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChangeSelectedClasse(event) {
    this.setState(
      {
        selectedClasse: event.target.value,
        addForm: false,
        updateForm: false,
        loadingData: true
      },
      () => {
        if (this.state.selectedClasse !== '') {
          this.getListElevesByClasse(this.state.selectedClasse);
        }
      }
    );
  }

  displayAddForm = () => {
    this.setState({
      addForm: true,
      updateForm: false,
      eleve: { nom: '', prenom: '', classe: this.state.selectedClasse }
    });
  };

  onCancelForm = () => {
    this.setState({
      addForm: false,
      updateForm: false
    });
  };

  handleChangeNomEleve(event) {
    const newEleve = { ...this.state.eleve };
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
    const newEleve = { ...this.state.eleve };
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
    const newEleve = { ...this.state.eleve };
    this.setState({
      eleve: {
        _id: newEleve._id,
        nom: newEleve.nom,
        prenom: newEleve.prenom,
        classe: event.target.value
      }
    });
  }

  handleSubmit = eleve => {
    if (this.state.addForm && this.state.eleve._id === undefined) {
      axios
        .post('/eleves', eleve)
        .then(res => {
          console.log(res);
          const newList = [...this.state.listEleves];
          newList.push(res.data.obj);
          this.setState({
            addForm: false,
            updateForm: false,
            eleve: { _id: null, nom: '', prenom: '', classe: '' },
            listEleves: newList
          });
        })
        .catch(err => console.log(err));
    } else {
      axios
        .put('/eleves/' + eleve._id, eleve)
        .then(res => {
          console.log(res);
          const newList = [...this.state.listEleves];
          newList.forEach((e, i) => {
            if (e._id === eleve._id) {
              newList[i] = res.data.obj;
            }
          });

          console.log(newList);
          this.setState({
            addForm: false,
            updateForm: false,
            eleve: { _id: null, nom: '', prenom: '', classe: '' },
            listEleves: newList
          });
        })
        .catch(err => console.log(err));
    }
  };

  handleUpdate = obj => {
    this.setState({
      eleve: obj,
      updateForm: true,
      addForm: false
    });
  };

  handleDelete = eleve => {
    axios
      .delete('/eleves/' + eleve._id)
      .then(res => {
        console.log(res);
        let newList = [...this.state.listEleves];
        let i = newList.indexOf(eleve);
        newList.splice(i, 1);
        this.setState({
          listEleves: newList
        });
      })
      .catch(err => console.log(err));
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
          listClasses={this.state.listClasses}
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
          listClasses={this.state.listClasses}
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
    let options = this.state.listClasses.map((c, i) => {
      return (
        <option value={c._id} key={i}>
          {c.nom_classe}
        </option>
      );
    });

    let selectClasse = <Spinner />;
    if (!this.state.loadingClasses) {
      selectClasse = (
        <select
          className="form-control select-classe"
          name="classe"
          id="classe"
          value={this.state.selectedClasse}
          onChange={event => this.handleChangeSelectedClasse(event)}>
          <option value="">Classe</option>
          {options}
        </select>
      );
    }

    let data = <Spinner />;
    if (this.state.selectedClasse !== '') {
      if (!this.state.loadingData) {
        if (this.state.listEleves.length > 0) {
          data = (
            <Tableau
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
              listHeaders={this.state.elevesHeader}
              listBody={this.state.listEleves}
              listKey={this.state.itemKey}
              tableStyle={this.state.tableStyle}
              rowStyle={this.state.rowStyle}
              consulterButton={this.state.consulterButton}
            />
          );
        } else {
          data = <p>Aucune donnée à afficher</p>;
        }
      }
    } else {
      data = <p>Sélectionnez une classe pour commencer</p>;
    }

    return (
      <div className="container header">
        <h2 className="page-header">
          Gestion élèves
          {addButon}
        </h2>
        {selectClasse}
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">{data}</div>
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">{eleveForm}</div>
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

export default GestionEleves;
