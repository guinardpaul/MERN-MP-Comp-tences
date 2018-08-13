import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DomaineTableau from './gestion-tableau/domaineTableau';
import { connect } from 'react-redux';
import * as domaineActionCreators from '../../store/actions/domaine';
import * as competenceActionCreators from '../../store/actions/competence';
import Aux from '../../hoc/Auxil/Auxil';
import Modal from '../UI/Modal/Modal';
import DomaineForm from '../gestion-form/domaine-form';

class GestionDomaines extends Component {
  state = {
    optionsDomaine: []
  };

  componentDidMount() {
    this.setState({
      optionsDomaine: [...this.props.optionsDomaine]
    }, () => console.log(this.props.optionsDomaine));
  }

  handleUpdate = domaine => {
    console.log('domaine: ', domaine);
  };

  handleDelete = domaine => {
    console.log('domaine: ', domaine);
  };

  onCancelForm = () => { }
  handleChangeRef = () => { }
  handleChangeDescription = () => { }
  handleChangeCycle = (event) => {
    const domaineOptions = [...this.state.optionsDomaine].filter(d => d.cycle_id === parseInt(event.target.value, 10));
    this.setState({
      optionsDomaine: domaineOptions
    });
  };

  handleChangeSousDomaine = () => { }

  render() {
    let domaineTable;
    if (this.props.selectedCycle !== '') {
      if (this.props.listDomaines.length > 0) {
        domaineTable = (
          <DomaineTableau
            onConsulter={(obj) => this.props.onSelectDomaine(obj)}
            consulterButton={this.state.consulterButton}
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            data={this.props.listDomaines}
            btnStyleVertical
            selectedRow={this.props.selectedRow}
          />
        );
      } else {
        domaineTable = <p>Aucune donnée à afficher</p>;
      }
    }

    let formInfo = { styleForm: '', headingForm: '', buttonStyle: '', buttonName: '' };
    let headingForm = '';
    if (this.props.showDomaineForm) {
      headingForm = 'Domaine';
    } else if (this.props.showSousDomaineForm) {
      headingForm = 'Sous-domaine';
    }

    if (this.props.update) {
      formInfo = { styleForm: 'panel panel-warning', headingForm: 'Modifier ' + headingForm, buttonStyle: 'btn btn-warning', buttonName: 'Modifier' };
    } else {
      formInfo = { styleForm: 'panel panel-success', headingForm: 'Ajouter ' + headingForm, buttonStyle: 'btn btn-success', buttonName: 'Créer' };
    }

    return (
      <Aux className="container">
        <Modal modalClosed={this.props.cancelDomaineForm} show={this.props.showDomaineForm || this.props.showSousDomaineForm}>
          <DomaineForm
            addSousDomaine={this.props.showSousDomaineForm}
            styleForm={formInfo.styleForm}
            headingForm={formInfo.headingForm}
            handleChangeRef={this.handleChangeRef}
            handleChangeDescription={this.handleChangeDescription}
            handleChangeCycle={this.handleChangeCycle}
            handleChangeSousDomaine={this.handleChangeSousDomaine}
            buttonStyle={formInfo.buttonStyle}
            buttonName={formInfo.buttonName}
            cancelForm={this.onCancelForm}
            optionsDomaine={this.state.optionsDomaine}
          />
        </Modal>
        {domaineTable}
      </Aux>
    );
  }
}

GestionDomaines.propTypes = {
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
    addDomaine: domaine =>
      dispatch(domaineActionCreators.addDomaineAsync(domaine)),
    updateDomaine: domaine =>
      dispatch(domaineActionCreators.updateDomaineAsync(domaine)),
    deleteDomaine: id_domaine =>
      dispatch(domaineActionCreators.deleteDomaineAsync(id_domaine)),
    getCompetencesByDomaine: id_domaine =>
      dispatch(
        competenceActionCreators.getAllCompetencesByDomaineAsync(id_domaine)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GestionDomaines);
