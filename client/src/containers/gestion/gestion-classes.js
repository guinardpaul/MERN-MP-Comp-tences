import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tableau from '../../components/UI/Table/Tableau';
import GestionClassesForm from '../../components/gestion-form/gestion-classes-form';
import './gestion.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreator from '../../store/actions/index';
import { connect } from 'react-redux';

class GestionClasses extends Component {
  state = {
    error: {},
    classe: {},
    classesHeader: [
      { header: 'Nom classe', accessor: 'nom_classe' },
      { header: 'Cycle', accessor: 'cycle' }
    ],
    tableStyle: 'table table-striped',
    rowStyle: [100, 100, 200],
    itemKey: ['nom_classe', 'cycle'],
    addForm: false,
    updateForm: false,
    consulterButton: false
  };

  componentDidMount() {
    this.props.getAllClasses();
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
    this.setState({
      classe: obj,
      updateForm: true,
      addForm: false
    });
  };

  handleDelete = obj => {
    this.props.deleteClasse(obj._id);
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
    } else if (
      this.props.error &&
      (this.state.addForm || this.state.updateForm)
    ) {
      classeForm = this.props.error.message;
    }

    let data = <Spinner />;
    if (!this.props.loading) {
      if (this.props.listClasses.length > 0) {
        data = (
          <Tableau
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            onConsulter={this.handleUpdate}
            columns={this.state.classesHeader}
            data={this.props.listClasses}
            listKey={this.state.itemKey}
            tableStyle={this.state.tableStyle}
            rowStyle={this.state.rowStyle}
            consulterButton={this.state.consulterButton}
          />
        );
      } else {
        data = <p>Aucune donnée à afficher</p>;
      }
    } else {
      data = this.props.error.message;
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

export default connect(mapStateToProps, mapDispatchToProps)(GestionClasses);
