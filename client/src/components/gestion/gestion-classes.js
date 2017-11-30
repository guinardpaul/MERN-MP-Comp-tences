import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tableau from '../shared/Table/Tableau';
import GestionClassesForm from './gestion-classes-form';
import { Classe } from '../../models/classe';
import './gestion.css';

class GestionClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      classe: Classe,
      classesHeader: ['Nom classe', 'Cycle', 'Actions'],
      tableStyle: 'table table-striped',
      rowStyle: [100, 100, 800],
      itemKey: ['nom_classe', 'cycle'],
      addForm: false,
      updateForm: false,
      consulterButton: false
    };

    this.displayForm = this.displayForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onCancelForm = this.onCancelForm.bind(this);
  }

  componentWillMount() {
    fetch('http://localhost:4000/api/classes', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          classes: data
        }, () => {
          console.log(this.state.classes);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  displayForm() {
    this.setState({
      addForm: true,
      updateForm: false,
      classe: Classe
    });
  }

  handleSubmit(classe) {
    console.log(classe);
    const newState = this.state.classes;
    newState.push(classe);
    this.setState({
      classes: newState,
      addForm: false,
      updateForm: false
    });
    console.log(this.state);
  }

  handleUpdate(obj) {
    console.log(obj);
    this.setState({
      updateForm: true,
      addForm: false,
      classe: obj
    });
  }

  handleDelete(obj) {
    let newState = this.state.devis;
    let i = newState.indexOf(obj);
    newState.splice(i, 1);

    this.setState({
      classes: newState
    });
  }

  onCancelForm() {
    this.setState({
      addForm: false,
      updateForm: false
    });
  }

  render() {
    let classeForm;
    if (this.state.addForm) {
      classeForm = <GestionClassesForm
        onFormSubmit={this.handleSubmit}
        styleForm="panel-info"
        headingForm="Création classe"
        buttonStyle="btn btn-success"
        buttonName="Sauver"
        classe={this.state.classe}
        cancelForm={this.onCancelForm}
      />
    } else if (this.state.updateForm) {
      classeForm = <GestionClassesForm
        onFormSubmit={this.handleSubmit}
        styleForm="panel-warning"
        headingForm="Modification classe"
        buttonStyle="btn btn-warning"
        buttonName="Modifier"
        classe={this.state.classe}
        cancelForm={this.onCancelForm}
      />
    }

    let data;
    if (this.state.classes.length > 0) {
      data = <Tableau
        onUpdate={this.handleUpdate}
        onDelete={this.handleDelete}
        listHeaders={this.state.classesHeader}
        listBody={this.state.classes}
        listKey={this.state.itemKey}
        tableStyle={this.state.tableStyle}
        rowStyle={this.state.rowStyle}
        consulterButton={this.state.consulterButton}
      />
    } else {
      data = <p>No data to display</p>
    }

    return (
      <div className="container">
        <h2 className="page-header">
          Gestion classes
          <button className="btn btn-primary btn-circle btn-lg margin" onClick={this.displayForm}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </h2>
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">
          {data}
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">
          {classeForm}
        </div>
      </div >
    );
  }
}

GestionClasses.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.object),
  classe: PropTypes.func,
  classesHeader: PropTypes.arrayOf(PropTypes.string),
  displayForm: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  tableStyle: PropTypes.string,
  itemKey: PropTypes.arrayOf(PropTypes.string),
  consulterButton: PropTypes.bool,
  addForm: PropTypes.bool,
  updateForm: PropTypes.bool,
  classeForm: PropTypes.element
};

export default GestionClasses;