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
import Popover from '../../components/UI/Popover/Popover';
import Aux from '../../hoc/Auxil/Auxil';

class GestionDomainesCompetences extends Component {
  state = {
    domaineForm: false,
    sousDomaineForm: false,
    updateData: false,
    selectedCycle: '',
    selectedDomaine: '',
    listDomaines: [],
    listSousDomainesCompetences: []
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

    return treeTableData;
  };

  displayDomaineForm = () => {
    this.setState({
      domaineForm: true,
      sousDomaineForm: false
    });
  };

  displaySousDomaineForm = () => {
    this.setState({
      domaineForm: false,
      sousDomaineForm: true
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
        }
      }
    );
  }

  onSelectDomaine(domaine) {
    const listSousDomainesCompetences = this.buildData(domaine);

    this.setState({
      selectedDomaine: domaine,
      listSousDomainesCompetences: listSousDomainesCompetences
    });
  }

  cancelDomaineForm = () => {
    this.setState({
      domaineForm: false,
      sousDomaineForm: false
    });
  };

  onUpdate = obj => {};

  onDelete = obj => {};

  render() {
    const options = ENUM_CYCLES.map((cycle, i) => {
      return (
        <option value={cycle.id} key={i}>
          {cycle.literal}
        </option>
      );
    });

    return (
      <div className="container header">
        <h2 className="page-header ">Gestion Competences</h2>

        <select
          className="form-control select-classe"
          name="cycle"
          id="cycle"
          value={this.state.selectedCycle}
          onChange={event => this.handleChangeSelectedCycle(event)}>
          <option value="">Cycle</option>
          {options}
        </select>

        <div className="row">
          {this.state.selectedCycle !== '' ? (
            this.props.listDomaines.length > 0 ? (
              <div className="col-sm-6 col-md-6 col-lg-6">
                <GestionDomaines
                  onUpdate={this.onUpdate}
                  onDelete={this.onDelete}
                  selectedCycle={this.state.selectedCycle}
                  listDomaines={this.state.listDomaines}
                  onSelectDomaine={domaine => this.onSelectDomaine(domaine)}
                  selectedRow={this.state.selectedDomaine}
                  displayDomaineForm={this.displayDomaineForm}
                  displaySousDomaineForm={this.displaySousDomaineForm}
                  showDomaineForm={this.state.domaineForm}
                  showSousDomaineForm={this.state.sousDomaineForm}
                  update={this.state.updateData}
                  cancelDomaineForm={this.cancelDomaineForm}
                  optionsDomaine={this.props.listDomaines}
                />
              </div>
            ) : (
              <p>Chargement...</p>
            )
          ) : (
            <p>Sélectionner un cycle pour commencer.</p>
          )}

          <div className="col-sm-6 col-md-6 col-lg-6">
            {this.state.selectedDomaine !== '' ? (
              <GestionCompetences
                listSousDomainesCompetences={
                  this.state.listSousDomainesCompetences
                }
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
// class GestionDomainesCompetences extends Component {
//   constructor() {
//     super();

//     this.state = {
//       data: [
//         {
//           id: 1,
//           date: '2014-04-18',
//           total: 121.0,
//           status: 'Shipped',
//           name: 'A',
//           points: 5,
//           percent: 50
//         },
//         {
//           id: 2,
//           date: '2014-04-21',
//           total: 121.0,
//           status: 'Not Shipped',
//           name: 'B',
//           points: 10,
//           percent: 60
//         },
//         {
//           id: 3,
//           date: '2014-08-09',
//           total: 121.0,
//           status: 'Not Shipped',
//           name: 'C',
//           points: 15,
//           percent: 70
//         },
//         {
//           id: 4,
//           date: '2014-04-24',
//           total: 121.0,
//           status: 'Shipped',
//           name: 'D',
//           points: 20,
//           percent: 80
//         },
//         {
//           id: 5,
//           date: '2014-04-26',
//           total: 121.0,
//           status: 'Shipped',
//           name: 'E',
//           points: 25,
//           percent: 90
//         }
//       ],
//       expandedRows: []
//     };
//   }

//   handleRowClick(rowId) {
//     const currentExpandedRows = this.state.expandedRows;
//     const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

//     const newExpandedRows = isRowCurrentlyExpanded
//       ? currentExpandedRows.filter(id => id !== rowId)
//       : currentExpandedRows.concat(rowId);

//     this.setState({ expandedRows: newExpandedRows });
//   }

//   renderItem(item) {
//     const clickCallback = () => this.handleRowClick(item.id);
//     const itemRows = [
//       <tr onClick={clickCallback} key={'row-data-' + item.id}>
//         <td>{item.date}</td>
//         <td>{item.total}</td>
//         <td>{item.status}</td>
//       </tr>
//     ];

//     if (this.state.expandedRows.includes(item.id)) {
//       itemRows.push(
//         <tr key={'row-expanded-' + item.id}>
//           <td>{item.name}</td>
//           <td>{item.points}</td>
//           <td>{item.percent}</td>
//         </tr>
//       );
//     }

//     return itemRows;
//   }

//   render() {
//     let allItemRows = [];

//     this.state.data.forEach(item => {
//       const perItemRows = this.renderItem(item);
//       allItemRows = allItemRows.concat(perItemRows);
//     });

//     return (
//       <Aux>
//         <br />
//         <br />
//         <br />
//         <table className="table table-hover">{allItemRows}</table>
//       </Aux>
//     );
//   }
// }

// export default GestionDomainesCompetences;
