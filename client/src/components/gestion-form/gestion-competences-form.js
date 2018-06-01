import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Table/Button/Button';

class GestionCompetencesForm extends Component {
  state = {
    competence: {
      _id: null,
      ref_ct: '',
      description_ct: '',
      domaine: '',
      sous_domaine: ''
    },
    selectedDomaine: ''
  };

  componentDidMount() {
    this.setState({
      competence: {
        _id: this.props.competence._id,
        ref_ct: this.props.competence.ref_ct,
        description_ct: this.props.competence.description_ct,
        domaine: this.props.competence.domaine,
        sous_domaine: this.props.competence.sous_domaine
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.competence.ref_ct !== this.props.competence.ref_ct ||
      nextProps.competence.description_ct !==
        this.props.competence.description_ct ||
      this.state.competence.ref_ct !== nextProps.competence.ref_ct ||
      this.state.competence.description_ct !==
        nextProps.competence.description_ct
    );
  }

  componentWillUpdate(nextProps, nextState) {
    // Si shouldComponentUpdate => true
    this.setState({
      competence: {
        _id: nextProps.competence._id,
        ref_ct: nextProps.competence.ref_ct,
        description_ct: nextProps.competence.description_ct,
        domaine: nextProps.competence.domaine,
        sous_domaine: nextProps.competence.sous_domaine
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Une fois que le component s'est update
  }

  addCompetence = event => {
    event.preventDefault();
    if (
      this.state.competence.ref_ct !== '' &&
      this.state.competence.description_ct !== ''
    ) {
      this.props.onFormSubmit(this.state.competence);
      this.setState({
        competence: {
          _id: null,
          ref_ct: '',
          description_ct: '',
          domaine: '',
          sous_domaine: ''
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
                  name="ref_ct"
                  id="ref_ct"
                  value={this.props.competence.ref_ct}
                  onChange={this.props.handleChangeRefCT}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="ref_ct"
                  id="ref_ct"
                  value={this.props.competence.description_ct}
                  onChange={this.props.handleChangeDescriptionCT}
                  required
                />
              </div>

              <div className="form-group">
                <label>Domaine</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="ref_ct"
                  id="ref_ct"
                  value={
                    this.props.selectedDomaine.ref_domaine +
                    ' - ' +
                    this.props.selectedDomaine.description_domaine
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
