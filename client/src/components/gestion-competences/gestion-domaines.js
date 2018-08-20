import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DomaineTableau from './gestion-tableau/domaineTableau';
import { connect } from 'react-redux';
import * as domaineActionCreators from '../../store/actions/domaine';
import * as competenceActionCreators from '../../store/actions/competence';
import Aux from '../../hoc/Auxil/Auxil';
import Modal from '../UI/Modal/Modal';
import DomaineForm from '../gestion-form/domaine-form';
import Popover from '../UI/Popover/Popover';

class GestionDomaines extends Component {
  state = {
    optionsDomaine: [],
    domaine: {
      id: 0,
      ref: '',
      description: '',
      cycle_id: 0,
      sous_domaine_id: 0
    }
  };

  componentDidMount() {
    this.setState(
      {
        optionsDomaine: [...this.props.optionsDomaine]
      },
      () => console.log(this.props.optionsDomaine)
    );
  }

  handleUpdate = domaine => {
    console.log('domaine: ', domaine);
  };

  handleDelete = domaine => {
    console.log('domaine: ', domaine);
  };

  onCancelForm = () => {
    this.setState(
      {
        domaine: {
          id: 0,
          ref: '',
          description: '',
          cycle_id: 0,
          sous_domaine_id: 0
        }
      },
      () => this.props.cancelDomaineForm
    );
  };

  handleChangeRef = event => {
    const prevState = this.state.domaine;
    this.setState({
      domaine: { ...prevState, ref: event.target.value }
    });
  };

  handleChangeDescription = event => {
    const prevState = this.state.domaine;
    this.setState({
      domaine: {
        id: prevState.id,
        ref: prevState.ref,
        description: event.target.value,
        cycle_id: prevState.cycle_id,
        sous_domaine_id: prevState.sous_domaine_id
      }
    });
  };

  handleChangeCycle = event => {
    const prevState = this.state.domaine;
    const domaineOptions = [...this.props.optionsDomaine].filter(
      d => d.cycle_id === parseInt(event.target.value, 10)
    );
    this.setState({
      optionsDomaine: domaineOptions,
      domaine: {
        id: prevState.id,
        ref: prevState.ref,
        description: prevState.description,
        cycle_id: event.target.value,
        sous_domaine_id: prevState.sous_domaine_id
      }
    });
  };

  handleChangeSousDomaine = event => {
    const prevState = this.state.domaine;
    this.setState({
      domaine: {
        id: prevState.id,
        ref: prevState.ref,
        description: prevState.description,
        cycle_id: prevState.cycle_id,
        sous_domaine_id: event.target.value
      }
    });
  };

  render() {
    let domaineTable;
    if (this.props.selectedCycle !== '') {
      if (this.props.listDomaines.length > 0) {
        domaineTable = (
          <DomaineTableau
            onConsulter={obj => this.props.onSelectDomaine(obj)}
            consulterButton={this.state.consulterButton}
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            data={this.props.listDomaines}
            btnStyleVertical
            selectedRow={this.props.selectedRow}
          />
        );
      } else {
        domaineTable = <p> Aucune donnée à afficher </p>;
      }
    }

    let formInfo = {
      styleForm: '',
      headingForm: '',
      buttonStyle: '',
      buttonName: ''
    };
    let headingForm = '';
    if (this.props.showDomaineForm) {
      headingForm = 'Domaine';
    } else if (this.props.showSousDomaineForm) {
      headingForm = 'Sous-domaine';
    }

    if (this.props.update) {
      formInfo = {
        styleForm: 'panel panel-warning',
        headingForm: 'Modifier ' + headingForm,
        buttonStyle: 'btn btn-warning',
        buttonName: 'Modifier'
      };
    } else {
      formInfo = {
        styleForm: 'panel panel-success',
        headingForm: 'Ajouter ' + headingForm,
        buttonStyle: 'btn btn-success',
        buttonName: 'Créer'
      };
    }

    return (
      <Aux className="container">
        {this.props.selectedCycle !== '' ? (
          <Popover
            popupTitle="Créer un ..."
            placement="right"
            buttonTitle={<span className="glyphicon glyphicon-plus" />}
            buttonStyle="btn btn-primary btn-circle btn-lg margin">
            <button
              className="btn btn-primary"
              onClick={this.props.displayDomaineForm}>
              Domaine
            </button>
            <button
              className="btn btn-primary"
              onClick={this.props.displaySousDomaineForm}>
              Sous-domaine
            </button>
          </Popover>
        ) : null}
        <Modal
          modalClosed={this.props.cancelDomaineForm}
          show={this.props.showDomaineForm || this.props.showSousDomaineForm}>
          <DomaineForm
            domaine={this.state.domaine}
            addSousDomaine={this.props.showSousDomaineForm}
            styleForm={formInfo.styleForm}
            headingForm={formInfo.headingForm}
            handleChangeRef={event => this.handleChangeRef(event)}
            handleChangeDescription={event =>
              this.handleChangeDescription(event)
            }
            handleChangeCycle={event => this.handleChangeCycle(event)}
            handleChangeSousDomaine={event =>
              this.handleChangeSousDomaine(event)
            }
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
