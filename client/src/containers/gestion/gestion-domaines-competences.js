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
    selectedDomaine: '',
    listDomaines: [],
    listSousDomainesCompetences: []
  };

  componentWillMount() {
    this.props.getAllDomaines();
    this.props.getAllCompetences();
  }

  buildTreeTableData = selectedCycle => {
    const treeTableData = [];
    console.log('this.props.listDomaines: ', this.props.listDomaines);
    const domaines = [...this.props.listDomaines].filter(
      d => d.cycleid === parseInt(selectedCycle, 10) && d.ref !== 'null'
    );
    console.log('domaines: ', domaines);

    domaines.forEach(d => {
      const sous_domaines = [...this.props.listDomaines].filter(
        sous_domaine =>
          sous_domaine.cycleid === parseInt(selectedCycle, 10) &&
          sous_domaine.ref === 'null' &&
          sous_domaine.sous_domaine_id === d.id
      );
      console.log('sous_domaines: ', sous_domaines);

      // init toggle value
      d['toggle'] = false;
      if (sous_domaines.length > 0) {
        d['toggle'] = true;
      }
      console.log('d: ', d);

      // push le domaine
      treeTableData.push(d);
      // push sous_domaines
      for (let i = 0; i < sous_domaines.length; i++) {
        const element = sous_domaines[i];
        element['toggled'] = false;
        treeTableData.push(element);
      }
    });
    console.log('treeTableData: ', treeTableData);

    this.setState({
      listDomaines: treeTableData
    });
    // this.props.listDomaines.forEach(domaine => {
    //   this.props.getCompetencesByDomaine(domaine.id);
    //   const domaineTree = {
    //     domaine: domaine,
    //     children: [this.props.listCompetences]
    //   };
    //   console.log('domaineTree: ', domaineTree);
    //   treeTableData.push(domaineTree);
    // });

    // console.log(treeTableData);
  };

  filterList = selectedCycle => {
    const domainesFiltered = [...this.props.listDomaines].filter(
      d => d.cycle_id === parseInt(selectedCycle, 10) && d.ref !== 'null'
    );
    console.log('domainesFiltered: ', domainesFiltered);

    this.setState({
      listDomaines: domainesFiltered
    });
  };

  buildData = selectedDomaine => {
    const treeTableData = [];
    // On filtre les sous_domaines
    const sous_domaine_list = [...this.props.listDomaines].filter(
      d => d.sous_domaine_id === selectedDomaine.id
    );
    if (sous_domaine_list.length > 0) {
      for (let i = 0; i < sous_domaine_list.length; i++) {
        const competences = [...this.props.listCompetences].filter(
          c => c.domaine_id === sous_domaine_list[i].id
        );
        treeTableData.push(sous_domaine_list[i]);
        competences.forEach(ct => {
          treeTableData.push(ct);
        });
      }
    } else {
      const competences = [...this.props.listCompetences].filter(
        c => c.domaine_id === selectedDomaine.id
      );
      competences.forEach(ct => treeTableData.push(ct));
    }
    console.log('treeTableData: ', treeTableData);
    return treeTableData;
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
    const listSousDomainesCompetences = this.buildData(domaine);
    console.log('listSousDomainesCompetences: ', listSousDomainesCompetences);
    this.setState(
      {
        selectedDomaine: domaine,
        listSousDomainesCompetences: listSousDomainesCompetences
      },
      () => {
        if (domaine !== undefined) {
          this.props.getCompetencesByDomaine(domaine.id);
        }
      }
    );
  }

  toggleSousDomaines = domaineid => {
    const treeTableData = [...this.state.listDomaines];
    treeTableData.map(d => {
      if (d.sous_domaine_id === domaineid) {
        d.toggled = !d.toggled;
      }
    });

    this.setState({
      listDomaines: treeTableData
    });
  };

  render() {
    const options = ENUM_CYCLES.map((cycle, i) => {
      return (
        <option value={cycle.id} key={i}>
          {' '}
          {cycle.literal}{' '}
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
          Gestion Competences{' '}
          <button
            className="btn btn-primary btn-circle btn-lg margin"
            onClick={this.displayAddDomaineForm}>
            <span className="glyphicon glyphicon-plus" />
          </button>{' '}
        </h2>{' '}
        <select
          className="form-control select-classe"
          name="cycle"
          id="cycle"
          value={this.state.selectedCycle}
          onChange={event => this.handleChangeSelectedCycle(event)}>
          <option value=""> Cycle </option> {options}{' '}
        </select>{' '}
        {/* {this.props.listCompetences.length > 0 && !this.props.loadingCompetence
                ? reactTableTest
                : null} */}{' '}
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <GestionDomaines
              selectedCycle={this.state.selectedCycle}
              listDomaines={this.state.listDomaines}
              selectDomaine={domaine => this.selectDomaine(domaine)}
              listCompetences={this.state.listCompetences}
              toggleSousDomaines={domaineid =>
                this.toggleSousDomaines(domaineid)
              }
            />{' '}
          </div>{' '}
          <div className="col-sm-6 col-md-6 col-lg-6">
            {' '}
            {this.state.selectedDomaine !== '' ? (
              <GestionCompetences
                listSousDomainesCompetences={
                  this.state.listSousDomainesCompetences
                }
                selectedDomaine={this.state.selectedDomaine}
              />
            ) : null}{' '}
          </div>{' '}
        </div>{' '}
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
