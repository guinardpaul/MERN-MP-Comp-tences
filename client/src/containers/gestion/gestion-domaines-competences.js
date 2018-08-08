import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as domaineActionCreators from '../../store/actions/domaine';
import * as competenceActionCreators from '../../store/actions/competence';
import GestionDomaines from '../../components/gestion-competences/gestion-domaines';
import GestionCompetences from '../../components/gestion-competences/gestion-competences';
import Spinner from '../../components/UI/Spinner/Spinner';
import SelectTreeTable from '../../components/UI/SelectTreeTable/SelectTreeTable';
import { ENUM_CYCLES } from '../../models/enums';

class GestionDomainesCompetences extends Component {
  state = {
    addDomaineForm: false,
    cycles: ['Cycle 3', 'Cycle 4'],
    selectedCycle: '',
    selectedDomaine: ''
  };

  buildTreeTableData = selectedCycle => {
    const treeTableData = [];
    this.props.getAllDomainesByCycle(selectedCycle);

    console.log(this.props.loadingDomaine);
    this.props.listDomaines.forEach(domaine => {
      this.props.getCompetencesByDomaine(domaine.id);
      const domaineTree = {
        domaine: domaine,
        children: [this.props.listCompetences]
      };
      console.log('domaineTree: ', domaineTree);
      treeTableData.push(domaineTree);
    });

    console.log(treeTableData);
  };

  componentWillMount() {
    this.props.getAllDomaines();
    this.props.getAllCompetences();
  }

  filterList = selectedCycle => {
    const domaines = [...this.props.listDomaines];
    domaines.filter(d => d.cycle_id === selectedCycle);
    console.log(
      'domaines: ',
      domaines.filter(d => d.cycle_id === selectedCycle)
    );

    let domaineFiltered = this.props.listDomaines.filter(
      domaine => domaine.cycle_id === selectedCycle
    );

    console.log('this.props.listDomaines: ', this.props.listDomaines);
    console.log('domaineFiltered: ', domaineFiltered);
    let competencesFiltered = this.props.listCompetences.filter(
      ct => ct.cycle_id === selectedCycle
    );
    console.log('competencesFiltered: ', competencesFiltered);
  };

  buildData = () => {
    const treeTableData = [];
    this.props.listDomaines.forEach(domaine => {
      const domaineTree = {
        domaine: domaine,
        children: [
          this.props.listCompetences.filter(ct => ct.domaine !== domaine._id)
        ]
      };
      console.log('domaineTree: ', domaineTree);
      treeTableData.push(domaineTree);
    });
    console.log(treeTableData);
  };

  displayAddDomaineForm = () => {
    this.setState({
      addDomaineForm: true
    });
  };

  handleChangeSelectedCycle(event) {
    this.setState(
      {
        selectedCycle: event.target.value,
        selectedDomaine: ''
      },
      () => {
        if (this.state.selectedCycle !== '') {
          this.filterList(this.state.selectedCycle);
          // this.buildTreeTableData(this.state.selectedCycle);
          // this.props.getAllDomainesByCycle(this.state.selectedCycle);
          // setTimeout(() => {
          //   this.buildData();
          // }, 3000);
        }
      }
    );
  }

  selectDomaine(domaine) {
    this.setState({ selectedDomaine: domaine }, () => {
      if (domaine !== undefined) {
        this.props.getCompetencesByDomaine(domaine._id);
      }
    });
  }

  render() {
    const options = ENUM_CYCLES.map((cycle, i) => {
      return (
        <option value={cycle.id} key={i}>
          {cycle.literal}
        </option>
      );
    });

    /*  const columns = [
      { header: 'Référence', accessor: 'ref_domaine' },
      { header: 'Description', accessor: 'description_domaine' }
    ]; */

    // let reactTableTest = <SelectTreeTable data={this.props.listCompetences} />;

    return (
      <div className="container header">
        <h2 className="page-header ">
          Gestion Competences
          <button
            className="btn btn-primary btn-circle btn-lg margin"
            onClick={this.displayAddDomaineForm}>
            <span className="glyphicon glyphicon-plus" />
          </button>
        </h2>
        <select
          className="form-control select-classe"
          name="cycle"
          id="cycle"
          value={this.state.selectedCycle}
          onChange={event => this.handleChangeSelectedCycle(event)}>
          <option value="">Cycle</option>
          {options}
        </select>
        {/* {this.props.listCompetences.length > 0 && !this.props.loadingCompetence
          ? reactTableTest
          : null} */}
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <GestionDomaines
              selectedCycle={this.state.selectedCycle}
              listDomaines={this.props.listDomaines}
              selectDomaine={domaine => this.selectDomaine(domaine)}
              listCompetences={this.props.listCompetences}
            />
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            {this.state.selectedDomaine !== '' ? (
              <GestionCompetences
                selectedDomaine={this.state.selectedDomaine}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

GestionDomainesCompetences.propTypes = {
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
)(GestionDomainesCompetences);
