import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Table/Button/Button';

class GestionCompetencesForm extends Component {
  state = {
    competence: {
      id: null,
      ref: '',
      description: '',
      cycle_id: '',
      domaine_id: 0
    },
    selectedDomaine: ''
  };

  componentWillMount() {
    this.setState({
      competence: {
        id: this.props.competence.id,
        ref: this.props.competence.ref,
        description: this.props.competence.description,
        cycle_id: this.props.competence.cycle_id,
        domaine_id: this.props.competence.domaine_id
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.competence.ref !== this.props.competence.ref ||
      nextProps.competence.description !== this.props.competence.description ||
      nextProps.competence.domaine_id !== this.props.competence.domaine_id ||
      this.state.competence.ref !== nextProps.competence.ref ||
      this.state.competence.description !== nextProps.competence.description ||
      this.state.competence.domaine_id !== nextProps.competence.domaine_id
    );
  }

  componentWillUpdate(nextProps, nextState) {
    // Si shouldComponentUpdate => true
    this.setState({
      competence: {
        id: nextProps.competence.id,
        ref: nextProps.competence.ref,
        description: nextProps.competence.description,
        cycle_id: nextProps.competence.cycle_id,
        domaine_id: nextProps.competence.domaine_id
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Une fois que le component s'est update
  }

  addCompetence = event => {
    console.log(this.state.competence);
    event.preventDefault();
    if (
      this.state.competence.ref !== '' &&
      this.state.competence.description !== '' &&
      this.state.competence.domaine_id !== 0
    ) {
      this.props.onFormSubmit(this.state.competence);
      this.setState({
        competence: {
          id: null,
          ref: '',
          description: '',
          cycle_id: '',
          domaine_id: 0
        }
      });
    }
  };

  render() {
    console.log(this.state.competence);
    return (
      <div className="panel-group">
        <form className="form-horizontal" onSubmit={this.addCompetence}>
          <div className={this.props.styleForm}>
            <div className="panel-heading">{this.props.headingForm}</div>
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="ref_ct">Réf :</label>
                <input
                  type="text"
                  className="form-control"
                  name="ref"
                  id="ref"
                  value={this.state.competence.ref}
                  onChange={this.props.handleChangeRefCT}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label>Description :</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  value={this.state.competence.description}
                  onChange={this.props.handleChangeDescriptionCT}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  name="domaine_id"
                  id="domaine_id"
                  value={this.state.competence.domaine_id}
                  onChange={this.props.handleChangeDomaineID}
                  required>
                  <option value="0">Domaine</option>
                  {this.props.listDomaines
                    .filter(
                      item =>
                        item.cycle_id === parseInt(this.props.selectedCycle, 10)
                    )
                    .map(d => {
                      return (
                        <option key={d.id} value={d.id}>
                          {d.ref !== 'null'
                            ? d.ref + ' - ' + d.description
                            : 'Sous-domaine ' + d.description}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="form-group">
                <button type="submit" className={this.props.buttonStyle}>
                  {this.props.buttonName}
                </button>
                <button
                  onClick={this.props.cancelForm}
                  className="btn btn-default">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

GestionCompetencesForm.propTypes = {
  selectedCycle: PropTypes.string,
  listDomaines: PropTypes.arrayOf(PropTypes.object),
  competence: PropTypes.object,
  classe: PropTypes.object,
  cycles: PropTypes.arrayOf(PropTypes.string)
};

export default GestionCompetencesForm;
