import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GestionElevesForm extends Component {
  state = {
    eleve: { _id: null, nom: '', prenom: '', classe: '' },
    classes: []
  };

  componentWillMount() {
    if (this.props.selectedClasse !== '') {
      this.setState({
        eleve: {
          _id: this.props.eleve._id,
          nom: this.props.eleve.nom,
          prenom: this.props.eleve.prenom,
          classe: this.props.selectedClasse
        },
        classes: this.props.listClasses
      });
    } else {
      this.setState({
        eleve: {
          _id: this.props.eleve._id,
          nom: this.props.eleve.nom,
          prenom: this.props.eleve.prenom,
          classe: this.props.eleve.classe
        },
        classes: this.props.listClasses
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.eleve.nom !== this.props.eleve.nom ||
      nextProps.eleve.prenom !== this.props.eleve.prenom ||
      nextProps.eleve.classe !== this.props.eleve.classe ||
      this.state.eleve.nom !== nextProps.eleve.nom ||
      this.state.eleve.prenom !== nextProps.eleve.prenom ||
      this.state.eleve.classe !== nextProps.eleve.classe
    );
  }

  componentWillUpdate(nextProps, nextState) {
    // Si shouldComponentUpdate => true
    this.setState({
      eleve: {
        _id: this.props.eleve._id,
        nom: nextProps.eleve.nom,
        prenom: nextProps.eleve.prenom,
        classe: nextProps.eleve.classe
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Une fois que le component s'est update
  }

  submitEleve = event => {
    event.preventDefault();
    if (
      this.state.eleve.nom !== '' &&
      this.state.eleve.prenom !== '' &&
      this.state.eleve.classe !== ''
    ) {
      this.props.onFormSubmit(this.state.eleve);
      this.setState({
        eleve: {
          nom: '',
          prenom: '',
          classe: ''
        }
      });
    }
  };

  render() {
    let options = this.state.classes.map((c, i) => {
      return (
        <option value={c._id} key={i}>
          {c.nom_classe}
        </option>
      );
    });

    return (
      <div className="panel-group">
        <form
          className="form-horizontal"
          onSubmit={event => this.submitEleve(event)}>
          <div className={this.props.styleForm}>
            <div className="panel-heading">{this.props.headingForm}</div>
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="nom">Nom :</label>
                <input
                  type="text"
                  className="form-control"
                  name="nom"
                  id="nom"
                  value={this.state.eleve.nom}
                  onChange={this.props.handleChangeNomEleve}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prenom">Prénom :</label>
                <input
                  type="text"
                  className="form-control"
                  name="prenom"
                  id="prenom"
                  value={this.state.eleve.prenom}
                  onChange={this.props.handleChangePrenomEleve}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  name="classe"
                  id="classe"
                  value={this.state.eleve.classe}
                  onChange={this.props.handleChangeClasse}
                  required
                  disabled={this.props.addForm}>
                  <option value="">Classe</option>
                  {options}
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

GestionElevesForm.propTypes = {
  eleve: PropTypes.object,
  classe: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.element
};

export default GestionElevesForm;
