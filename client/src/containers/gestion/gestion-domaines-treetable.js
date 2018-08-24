import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as domaineActionCreators from '../../store/actions/domaine';
import * as competenceActionCreators from '../../store/actions/competence';
import GestionDomaines from '../../components/gestion-competences/gestion-domaines';
import GestionCompetences from '../../components/gestion-competences/gestion-competences';
import Spinner from '../../components/UI/Spinner/Spinner';
import SelectTreeTable from '../../components/UI/SelectTreeTable/SelectTreeTable';
import { ENUM_CYCLES, ENUM_DOMAINE_COMPETENCE_VALUE } from '../../models/enums';
import Popover from '../../components/UI/Popover/Popover';
import Aux from '../../hoc/Auxil/Auxil';
import TreeTable from '../../components/UI/TreeTable/TreeTable';
import Modal from '../../components/UI/Modal/Modal';
import DomaineForm from '../../components/gestion-form/domaine-form';
import GestionCompetencesForm from '../../components/gestion-form/gestion-competences-form';

class GestionDomainesTreeTable extends Component {
  state = {
    domaineForm: false,
    sousDomaineForm: false,
    competenceForm: false,
    updateData: false,
    editionMode: false,
    selectedCycle: '',
    data: [],
    expandedRows: [],
    domaine: {
      id: 0,
      ref: '',
      description: '',
      cycle_id: '',
      sous_domaine_id: null
    },
    competence: {
      id: 0,
      ref: '',
      description: '',
      cycle_id: '',
      domaine_id: 0
    }
  };

  componentWillMount() {
    this.props.getAllDomaines();
    this.props.getAllCompetences();
  }

  filterList = selectedCycle => {
    const domainesFiltered = [...this.props.listDomaines].filter(
      d => d.cycle_id === parseInt(selectedCycle, 10) && d.ref !== 'null'
    );

    this.setState({
      data: domainesFiltered
    });
  };

  displayDomaineForm = () => {
    this.setState({
      domaineForm: true,
      sousDomaineForm: false,
      competenceForm: false,
      domaine: {
        id: 0,
        ref: '',
        description: '',
        cycle_id: parseInt(this.state.selectedCycle, 10),
        sous_domaine_id: null
      }
    });
  };

  displaySousDomaineForm = () => {
    this.setState({
      domaineForm: false,
      sousDomaineForm: true,
      competenceForm: false,
      domaine: {
        id: 0,
        ref: '',
        description: '',
        cycle_id: parseInt(this.state.selectedCycle, 10),
        sous_domaine_id: 0
      }
    });
  };

  displayCompetenceForm = () => {
    this.setState({
      domaineForm: false,
      sousDomaineForm: false,
      competenceForm: true,
      competence: {
        id: 0,
        ref: '',
        description: '',
        cycle_id: parseInt(this.state.selectedCycle, 10),
        domaine_id: 0
      }
    });
  };

  handleChangeSelectedCycle(event) {
    this.setState(
      {
        selectedCycle: event.target.value
      },
      () => {
        if (this.state.selectedCycle !== '') {
          this.filterList(this.state.selectedCycle);
        }
      }
    );
  }

  handleChangeRef = event => {
    const prevState = { ...this.state.domaine };
    this.setState({
      domaine: {
        ...prevState,
        ref: event.target.value
      }
    });
  };

  handleChangeDescription = event => {
    const prevState = { ...this.state.domaine };
    this.setState({
      domaine: {
        ...prevState,
        description: event.target.value
      }
    });
  };

  handleChangeSousDomaineID = event => {
    const prevState = { ...this.state.domaine };
    this.setState({
      domaine: {
        ...prevState,
        sous_domaine_id: parseInt(event.target.value, 10)
      }
    });
  };

  handleChangeRefCT = event => {
    const prevState = { ...this.state.competence };
    this.setState({
      competence: {
        ...prevState,
        ref: event.target.value
      }
    });
  };

  handleChangeDescriptionCT = event => {
    const prevState = { ...this.state.competence };
    this.setState({
      competence: {
        ...prevState,
        description: event.target.value
      }
    });
  };

  handleChangeDomaineID = event => {
    const prevState = { ...this.state.competence };
    this.setState({
      competence: {
        ...prevState,
        domaine_id: parseInt(event.target.value, 10)
      }
    });
  };

  handleUpdate = (obj, typeObj) => {
    switch (typeObj) {
      case ENUM_DOMAINE_COMPETENCE_VALUE[0]:
        this.setState({
          domaine: obj,
          updateData: true,
          domaineForm: true
        });
        break;
      case ENUM_DOMAINE_COMPETENCE_VALUE[1]:
        this.setState({
          domaine: obj,
          updateData: true,
          sousDomaineForm: true
        });
        break;
      case ENUM_DOMAINE_COMPETENCE_VALUE[2]:
        this.setState({
          competence: obj,
          updateData: true,
          competenceForm: true
        });
        break;

      default:
        console.log(
          'Erreur sur le typeObj ' +
            typeObj +
            '. Cette objet ne correspond à aucune valeur de ENUM_DOMAINE_COMPETENCE_VALUE.'
        );
        break;
    }
  };

  handleDelete = (obj, typeObj) => {
    console.log('typeObj: ', typeObj);
    console.log('obj deleted: ', obj);
  };

  addDomaine() {
    console.log(this.state.domaine);
  }

  addCompetence() {
    console.log(this.state.competence);
  }

  cancelForm = () => {
    this.setState({
      domaineForm: false,
      sousDomaineForm: false,
      competenceForm: false
    });
  };

  getFormInfo() {
    let formInfo = {};
    let headingForm = '';
    if (this.state.domaineForm) {
      headingForm = 'Domaine';
    } else if (this.state.sousDomaineForm) {
      headingForm = 'Sous-domaine';
    } else if (this.state.competenceForm) {
      headingForm = 'Compétence';
    }

    if (this.state.updateData) {
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

    return formInfo;
  }

  toggleEditMode = () => {
    this.setState({
      editionMode: !this.state.editionMode
    });
  };

  render() {
    const options = ENUM_CYCLES.map((cycle, i) => {
      return (
        <option value={cycle.id} key={i}>
          {cycle.literal}
        </option>
      );
    });
    console.log(this.state.domaine);
    console.log(this.state.competence);

    let formInfo = this.getFormInfo();

    return (
      <div className="container header">
        <h2 className="page-header ">
          Gestion Domaines / Competences
          {this.state.selectedCycle !== '' ? (
            <Aux>
              <Popover
                popupTitle="Créer un ..."
                placement="right"
                buttonTitle={<span className="glyphicon glyphicon-plus" />}
                buttonStyle="btn btn-primary btn-circle btn-lg margin">
                <button
                  className="btn btn-primary"
                  onClick={this.displayDomaineForm}>
                  Domaine
                </button>
                <button
                  className="btn btn-primary"
                  onClick={this.displaySousDomaineForm}>
                  Sous - domaine
                </button>
                <button
                  className="btn btn-primary"
                  onClick={this.displayCompetenceForm}>
                  Compétence
                </button>
              </Popover>
              <button onClick={this.toggleEditMode}> Mode édition </button>
            </Aux>
          ) : null}
        </h2>
        <select
          className="form-control select-classe"
          name="cycle"
          id="cycle"
          value={this.state.selectedCycle}
          onChange={event => this.handleChangeSelectedCycle(event)}>
          <option value=""> Cycle </option> {options}
        </select>
        <Modal
          modalClosed={this.cancelForm}
          show={
            this.state.domaineForm ||
            this.state.sousDomaineForm ||
            this.state.competenceForm
          }>
          {!this.state.competenceForm ? (
            <DomaineForm
              domaine={this.state.domaine}
              sousDomaineForm={this.state.sousDomaineForm}
              styleForm={formInfo.styleForm}
              headingForm={formInfo.headingForm}
              handleChangeRef={event => this.handleChangeRef(event)}
              handleChangeDescription={event =>
                this.handleChangeDescription(event)
              }
              handleChangeCycle={event => this.handleChangeCycle(event)}
              handleChangeSousDomaineID={event =>
                this.handleChangeSousDomaineID(event)
              }
              buttonStyle={formInfo.buttonStyle}
              buttonName={formInfo.buttonName}
              onFormSubmit={this.addDomaine}
              cancelForm={this.cancelForm}
              optionsDomaine={this.state.data}
            />
          ) : (
            <GestionCompetencesForm
              styleForm={formInfo.styleForm}
              headingForm={formInfo.headingForm}
              buttonStyle={formInfo.buttonStyle}
              buttonName={formInfo.buttonName}
              competence={this.state.competence}
              selectedCycle={this.state.selectedCycle}
              listDomaines={this.props.listDomaines}
              handleChangeRefCT={this.handleChangeRefCT}
              handleChangeDescriptionCT={this.handleChangeDescriptionCT}
              handleChangeDomaineID={this.handleChangeDomaineID}
              onFormSubmit={this.addCompetence}
              cancelForm={this.cancelForm}
            />
          )}
        </Modal>
        {this.state.selectedCycle !== '' ? (
          <TreeTable
            data={this.state.data}
            listDomaines={this.props.listDomaines}
            listCompetences={this.props.listCompetences}
            handleUpdate={this.handleUpdate}
            handleDelete={this.handleDelete}
            editionMode={this.state.editionMode}
          />
        ) : (
          <p> Sélectionner un cycle pour commencer </p>
        )}
      </div>
    );
  }
}

GestionDomainesTreeTable.propTypes = {
  addDomaineForm: PropTypes.bool,
  cycles: PropTypes.arrayOf(PropTypes.string),
  selectedCycle: PropTypes.string,
  isLoaded: PropTypes.bool,
  listDomaines: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.element,
  domaineTable: PropTypes.element
};

const mapStateToProps = state => {
  return {
    listDomaines: state.domaine.listDomaines,
    listCompetences: state.competence.listCompetences,
    loadingDomaine: state.domaine.loading,
    loadingCompetence: state.competence.loading,
    errorCompetence: state.competence.error,
    errorDomaine: state.domaine.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllDomaines: () => dispatch(domaineActionCreators.getAllDomainesAsync()),
    getAllDomainesByCycle: cycle =>
      dispatch(domaineActionCreators.getAllDomainesByCycleAsync(cycle)),
    addDomaine: domaine =>
      dispatch(domaineActionCreators.addDomaineAsync(domaine)),
    updateDomaine: domaine =>
      dispatch(domaineActionCreators.updateDomaineAsync(domaine)),
    deleteDomaine: id_domaine =>
      dispatch(domaineActionCreators.deleteDomaineAsync(id_domaine)),
    getAllCompetences: () =>
      dispatch(competenceActionCreators.getAllCompetencesAsync()),
    getCompetencesByDomaine: id_domaine =>
      dispatch(
        competenceActionCreators.getAllCompetencesByDomaineAsync(id_domaine)
      ),
    addCompetence: competence =>
      dispatch(competenceActionCreators.addCompetenceAsync(competence)),
    updateCompetence: competence =>
      dispatch(competenceActionCreators.updateCompetenceAsync(competence)),
    deleteCompetence: id_competence =>
      dispatch(competenceActionCreators.deleteCompetenceAsync(id_competence))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GestionDomainesTreeTable);
