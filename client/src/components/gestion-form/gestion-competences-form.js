import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Table/Button/Button';

class GestionCompetencesForm extends Component {
  state = {
    competence: {
      id: null,
      ref: '',
      description: '',
      domaine_id: '',
    },
    selectedDomaine: ''
  };

  componentDidMount() {
    this.setState({
      competence: {
        id: this.props.competence.id,
        ref: this.props.competence.ref,
        description: this.props.competence.description,
        domaine_id: this.props.competence.domaine_id
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.competence.ref !== this.props.competence.ref ||
      nextProps.competence.description !==
      this.props.competence.description ||
      this.state.competence.ref !== nextProps.competence.ref ||
      this.state.competence.description !==
      nextProps.competence.description
    );
  }

  componentWillUpdate(nextProps, nextState) {
    // Si shouldComponentUpdate => true
    this.setState({
      competence: {
        id: nextProps.competence.id,
        ref: nextProps.competence.ref,
        description: nextProps.competence.description,
        domaine_id: nextProps.competence.domaine_id
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Une fois que le component s'est update
  }

  addCompetence = event => {
    event.preventDefault();
    if (
      this.state.competence.ref !== '' &&
      this.state.competence.description !== ''
    ) {
      this.props.onFormSubmit(this.state.competence);
      this.setState({
        competence: {
          id: null,
          ref: '',
          description: '',
          domaine_id: ''
        }
      });
    }
  };

  render() {
    return (
      <div className="panel-group">
        <form className="form-horizontal" onSubmit={this.addCompetence}>
          <div className={this.props.styleForm}>
            <div className="panel-heading">{this.props.headingForm}</div>
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="ref_ct">Référence</label>
                <input
                  type="text"
                  className="form-control"
                  name="ref"
                  id="ref"
                  value={this.props.competence.ref}
                  onChange={this.props.handleChangeRef}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  value={this.props.competence.description}
                  onChange={this.props.handleChangeDescription}
                  required
                />
              </div>

              <div className="form-group">
                <label>Domaine</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="domaine_id"
                  id="domaine_id"
                  value={
                    this.props.selectedDomaine.ref +
                    ' - ' +
                    this.props.selectedDomaine.description
                  }
                  disabled
                  required
                />
              </div>
              <div className="form-group">
                <Button
                  cssClasses={['btn', 'btn-success']}
                  clicked={this.addComptence}
                  typeSubmit>
                  Ajouter
                </Button>
                <Button
                  cssClasses={['btn', 'btn-default']}
                  clicked={this.props.cancelForm}>
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

GestionCompetencesForm.propTypes = {
  classe: PropTypes.object,
  cycles: PropTypes.arrayOf(PropTypes.string)
};

export default GestionCompetencesForm;
