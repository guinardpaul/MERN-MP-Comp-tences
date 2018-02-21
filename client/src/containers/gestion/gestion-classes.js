import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tableau from '../../components/UI/Table/Tableau';
import GestionClassesForm from '../../components/gestion-form/gestion-classes-form';
import './gestion.css';
import axios from '../../axios-instance';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreator from '../../store/actions/index';
import { connect } from 'react-redux';

class GestionClasses extends Component {
  state = {
    listClasses: [],
    classe: {},
    classesHeader: ['Nom classe', 'Cycle', 'Actions'],
    tableStyle: 'table table-striped',
    rowStyle: [100, 100, 200],
    itemKey: ['nom_classe', 'cycle'],
    addForm: false,
    updateForm: false,
    consulterButton: false,
    loading: true
  };

  componentDidMount() {
    axios
      .get('/classes')
      .then(res => {
        this.setState({
          listClasses: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  displayAddForm = () => {
    this.setState({
      addForm: true,
      updateForm: false,
      classe: { nom_classe: '', cycle: '' }
    });
  };

  handleSubmit = obj => {
    if (this.state.addForm) {
      axios
        .post('/classes', obj)
        .then(res => {
          console.log(res);
          const newState = [...this.state.listClasses];
          newState.push(res.data.obj);

          this.setState({
            listClasses: newState,
            addForm: false,
            updateForm: false
          });
        })
        .catch(err => console.log(err));
    } else {
      axios
        .put('/classes/' + obj._id, obj)
        .then(res => {
          console.log(res);
          const newState = [...this.state.listClasses];
          newState.forEach((c, i) => {
            if (c._id === obj._id) {
              newState[i] = res.data.obj;
            }
          });

          this.setState({
            listClasses: newState,
            addForm: false,
            updateForm: false
          });
        })
        .catch(err => console.log(err));
    }
  };

  handleUpdate = obj => {
    this.setState({
      classe: obj,
      updateForm: true,
      addForm: false
    });
  };

  handleDelete = obj => {
    axios
      .delete('/classes/' + obj._id)
      .then(res => {
        console.log(res);
        let newState = [...this.state.listClasses];
        let i = newState.indexOf(obj);
        newState.splice(i, 1);

        this.setState({
          listClasses: newState
        });
      })
      .catch(err => console.log(err));
  };

  onCancelForm = () => {
    this.setState({
      addForm: false,
      updateForm: false,
      classe: {}
    });
  };

  handleChangeNomClasse = event => {
    const newState = Object.assign({}, this.state.classe);

    this.setState({
      classe: {
        _id: newState._id,
        nom_classe: event.target.value,
        cycle: newState.cycle
      }
    });
  };

  handleChangeCycle = event => {
    const newState = this.state.classe;

    this.setState({
      classe: {
        _id: newState._id,
        nom_classe: newState.nom_classe,
        cycle: event.target.value
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
    }

    let data = <Spinner />;
    if (!this.state.loading) {
      if (this.state.listClasses.length > 0) {
        data = (
          <Tableau
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            listHeaders={this.state.classesHeader}
            listBody={this.state.listClasses}
            listKey={this.state.itemKey}
            tableStyle={this.state.tableStyle}
            rowStyle={this.state.rowStyle}
            consulterButton={this.state.consulterButton}
          />
        );
      } else {
        data = <p>No data to display</p>;
      }
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
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">{data}</div>
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
    listClasses: state.classe.classes,
    classe: state.classe.classe
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GestionClasses);
