import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ENUM_CYCLES } from '../../../models/enums';

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
      sous_domaine_id: ''
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
    console.log('componentWillUpdate');

    // Si shouldComponentUpdate => true
    let nextSousDomaineId = '';
    if (nextProps.domaine.sous_domaine_id !== null) {
      nextSousDomaineId = nextProps.domaine.sous_domaine_id;
    }

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

  addDomaine = event => {
    // Vérification si on ajoute un domaine ou un sous-domaine
    event.preventDefault();
    this.props.onFormSubmit(this.state.domaine);
  };

  handleChangeRef = event => {
    const prevState = { ...this.state.domaine };
    this.setState({
      domaine: {
        ...prevState,
        ref: event.target.value
      }
    });
  };

  handleChangeDescription = event => {
    const prevState = { ...this.state.domaine };
    this.setState(
      {
        domaine: {
          id: prevState.id,
          ref: prevState.ref,
          description: event.target.value,
          cycle_id: prevState.cycle_id,
          sous_domaine_id: prevState.sous_domaine_id
        }
      },
      () => console.log(this.state.domaine)
    );
  };

  handleChangeSousDomaineID = event => {
    const prevState = { ...this.state.domaine };
    this.setState({
      domaine: {
        ...prevState,
        sous_domaine_id: event.target.value
      }
    });
  };

  render() {
    return (
      <div className="panel-group">
        <form className="form-horizontal" onSubmit={this.addDomaine}>
          <div className={this.props.styleForm}>
            <div className="panel-heading">{this.props.headingForm}</div>
            <div className="panel-body">
              {!this.props.sousDomaineForm ? (
                <div className="form-group">
                  <label htmlFor="ref">Ref :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ref"
                    id="ref"
                    value={this.state.domaine.ref}
                    onChange={this.props.handleChangeRef}
                    placeholder="D-..."
                    autoFocus
                    required
                  />
                </div>
              ) : null}

              <div className="form-group">
                <label htmlFor="description">Description :</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  value={this.state.domaine.description}
                  onChange={this.props.handleChangeDescription}
                  placeholder="description..."
                  required
                />
              </div>

              {/*} <div className="form-group">
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
              </div>*/}

              {/* Ajout de la liste des domaines existant et filtre en fonction du cycle sélectionné */}
              {this.props.sousDomaineForm ? (
                <div className="form-group">
                  <select
                    className="form-control"
                    name="sous_domaine_id"
                    id="sous_domaine_id"
                    value={this.state.domaine.sous_domaine_id}
                    onChange={this.props.handleChangeSousDomaineID}
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
