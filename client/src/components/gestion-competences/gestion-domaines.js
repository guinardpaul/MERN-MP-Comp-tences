import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DomaineTableau from './gestion-tableau/domaineTableau';
import { connect } from 'react-redux';
import * as domaineActionCreators from '../../store/actions/domaine';
import * as competenceActionCreators from '../../store/actions/competence';
import Aux from '../../hoc/Auxil/Auxil';
import { Collapse } from 'react-bootstrap';

class GestionDomaines extends Component {
  state = {
    addDomaineForm: false,
    cycles: ['Cycle 3', 'Cycle 4'],
    selectedCycle: '',
    selectedRow: null
  };

  displayAddDomaineForm = () => {
    this.setState({
      addDomaineForm: true,
      selectedRow: null
    });
  };

  handleChangeSelectedCycle(event) {
    this.setState(
      {
        selectedCycle: event.target.value,
        selectedRow: null
      },
      () => {
        if (this.state.selectedCycle !== '') {
          this.props.getAllDomainesByCycle(this.state.selectedCycle);
        }
      }
    );
  }

  handleSelectDomaine = obj => {
    this.props.selectDomaine(obj);
    this.setState({
      selectedRow: obj
    });
  };

  handleUpdate = domaine => {
    console.log('domaine: ', domaine);
  };

  handleDelete = domaine => {
    console.log('domaine: ', domaine);
  };

  render() {
    // let previousId = 0;
    let domaineTable;
    if (this.props.selectedCycle !== '') {
      if (this.props.listDomaines.length > 0) {
        domaineTable = (
          // <table>
          //   <thead>
          //     <tr>
          //       <th>#</th>
          //       <th>Ref</th>
          //       <th>Description</th>
          //       <th>Sous Domaine Id</th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {this.props.listDomaines.map(d => {
          //       console.log('previousId: ', previousId);
          //       const toggleBtn = (
          //         <button
          //           className="btn btn-success"
          //           onClick={() => this.props.toggleSousDomaines(d.id)}>
          //           +
          //         </button>
          //       );
          //       if (d.ref !== 'null') {
          //         return (
          //           <tr>
          //             <td>{d.toggle ? toggleBtn : null}</td>
          //             <td>{d.ref}</td>
          //             <td>{d.description}</td>
          //             <td>{d.sous_domaine_id}</td>
          //           </tr>
          //         );
          //       } else if (previousId === d.sous_domaine_id) {
          //         return (
          //           <Collapse in={d.toggled}>
          //             <tr>
          //               <td>{d.ref}</td>
          //               <td>{d.description}</td>
          //               <td>{d.sous_domaine_id}</td>
          //             </tr>
          //           </Collapse>
          //         );
          //       } else {
          //         previousId = d.sous_domaine_id;
          //         return (
          //           <Collapse in={d.toggled}>
          //             <table>
          //               <thead>
          //                 <tr>
          //                   <th>Ref</th>
          //                   <th>Description</th>
          //                   <th>Sous Domaine Id</th>
          //                 </tr>
          //               </thead>
          //               <tbody>
          //                 <tr>
          //                   <td>{d.ref}</td>
          //                   <td>{d.description}</td>
          //                   <td>{d.sous_domaine_id}</td>
          //                 </tr>
          //               </tbody>
          //             </table>
          //           </Collapse>
          //         );
          //       }
          //     })}
          //   </tbody>
          // </table>

          <DomaineTableau
            onConsulter={this.handleSelectDomaine}
            consulterButton={this.state.consulterButton}
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            data={this.props.listDomaines}
            expandableList={this.props.listCompetences}
            btnStyle
            selectedRow={this.state.selectedRow}
          />
        );
      } else {
        domaineTable = <p>Aucune donnée à afficher</p>;
      }
    }

    return <Aux className="container">{domaineTable}</Aux>;
  }
}

GestionDomaines.propTypes = {
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
