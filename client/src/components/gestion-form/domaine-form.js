import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ENUM_CYCLES } from '../../models/enums';

/**
 * Possibilité d'ajouter un domaine ou un sous_domaine => avec ou sans input pour sous_domaine_id
 */
class DomaineForm extends Component {
  state = {
    domaine: {
      id: 0,
      ref: '',
      description: '',
      cycle_id: 0,
      sous_domaine_id: 0
    }
  };

  componentDidMount() {
    this.setState({
      domaine: this.props.domaine
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.domaine.ref !== this.props.domaine.ref ||
      nextProps.domaine.description !== this.props.domaine.description ||
      nextProps.domaine.cycle_id !== this.props.domaine.cycle_id ||
      nextProps.domaine.sous_domaine_id !==
        this.props.domaine.sous_domaine_id ||
      this.state.domaine.ref !== nextProps.domaine.ref ||
      this.state.domaine.description !== nextProps.domaine.description ||
      this.state.domaine.cycle_id !== nextProps.domaine.cycle_id ||
      this.state.domaine.sous_domaine_id !==
        nextProps.domaine.sous_domaine_id ||
      nextProps.headingForm !== this.props.headingForm ||
      nextProps.styleForm !== this.props.styleForm
    );
  }

  componentWillUpdate(nextProps, nextState) {
    // Si shouldComponentUpdate => true
    this.setState({
      domaine: {
        id: nextProps.domaine.id,
        ref: nextProps.domaine.ref,
        description: nextProps.domaine.description,
        cycle_id: nextProps.domaine.cycle_id,
        sous_domaine_id: nextProps.domaine.sous_domaine_id
      }
    });
  }

  addDomaine = () => {
    // Vérification si on ajoute un domaine ou un sous-domaine
  };

  render() {
    const optionsCycle = ENUM_CYCLES.map(cycle => {
      return (
        <option key={cycle.id} value={cycle.id}>
          {cycle.literal}
        </option>
      );
    });

    return (
      <div className="panel-group">
        <form className="form-horizontal" onSubmit={this.addDomaine}>
          <div className={this.props.styleForm}>
            <div className="panel-heading">{this.props.headingForm}</div>
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="ref">Ref :</label>
                <input
                  type="text"
                  className="form-control"
                  name="ref"
                  id="ref"
                  value={this.state.domaine.ref}
                  onChange={this.props.handleChangeRef}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description :</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  value={this.state.domaine.description}
                  onChange={this.props.handleChangeDescription}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  name="cycle"
                  id="cycle"
                  value={this.state.domaine.cycle_id}
                  onChange={this.props.handleChangeCycle}
                  required>
                  <option value="0">Cycles</option>
                  {optionsCycle}
                </select>
              </div>
              {/* Ajout de la liste des domaines existant et filtre en fonction du cycle sélectionné */}
              {this.props.addSousDomaine ? (
                <div className="form-group">
                  <select
                    className="form-control"
                    name="sous_domaine_id"
                    id="sous_domaine_id"
                    value={this.state.domaine.sous_domaine_id}
                    onChange={this.props.handleChangeSousDomaine}
                    required>
                    <option value="0">Domaine</option>
                    {this.props.optionsDomaine.map(domaine => {
                      return (
                        <option value={domaine.id} key={domaine.id}>
                          {domaine.ref} - {domaine.description}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : null}

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

export default DomaineForm;
