import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GestionElevesForm extends Component {
  state = {
    eleve: { id: null, first_name: '', last_name: '', classe_id: '' },
    classes: []
  };

  componentWillMount() {
    if (this.props.selectedClasse !== '') {
      this.setState({
        eleve: {
          id: this.props.eleve.id,
          first_name: this.props.eleve.first_name,
          last_name: this.props.eleve.last_name,
          classe: this.props.selectedClasse
        },
        classes: this.props.listClasses
      });
    } else {
      this.setState({
        eleve: {
          id: this.props.eleve.id,
          first_name: this.props.eleve.first_name,
          last_name: this.props.eleve.last_name,
          classe: this.props.eleve.classe_id
        },
        classes: this.props.listClasses
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.eleve.first_name !== this.props.eleve.first_name ||
      nextProps.eleve.last_name !== this.props.eleve.last_name ||
      nextProps.eleve.classe !== this.props.eleve.classe ||
      this.state.eleve.first_name !== nextProps.eleve.first_name ||
      this.state.eleve.last_name !== nextProps.eleve.last_name ||
      this.state.eleve.classe_id !== nextProps.eleve.classe_id
    );
  }

  componentWillUpdate(nextProps, nextState) {
    // Si shouldComponentUpdate => true
    this.setState({
      eleve: {
        id: this.props.eleve.id,
        first_name: nextProps.eleve.first_name,
        last_name: nextProps.eleve.last_name,
        classe: nextProps.eleve.classe_id
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Une fois que le component s'est update
  }

  submitEleve = event => {
    event.preventDefault();
    if (
      this.state.eleve.first_name !== '' &&
      this.state.eleve.last_name !== '' &&
      this.state.eleve.classe !== ''
    ) {
      this.props.onFormSubmit(this.state.eleve);
      this.setState({
        eleve: {
          first_name: '',
          last_name: '',
          classe: ''
        }
      });
    }
  };

  render() {
    let options = this.state.classes.map((c, i) => {
      return (
        <option value={c.id} key={i}>
          {c.name}
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
                <label htmlFor="first_name">Nom :</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  id="first_name"
                  value={this.state.eleve.first_name}
                  onChange={this.props.handleChangefirstName}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="last_name">Prénom :</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  id="last_name"
                  value={this.state.eleve.last_name}
                  onChange={this.props.handleChangelastName}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  name="classe_id"
                  id="classe_id"
                  value={this.state.eleve.classe_id}
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
