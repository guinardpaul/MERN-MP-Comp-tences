import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ENUM_CYCLES } from '../../../models/enums';

class GestionClassesForm extends Component {
  state = {
    classe: { id: null, name: '', enumCycleId: '' }
  };

  componentDidMount() {
    this.setState({
      classe: {
        id: this.props.classe.id,
        name: this.props.classe.name,
        cycle_id: this.props.classe.cycle_id
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.classe.name !== this.props.classe.name ||
      nextProps.classe.enumCycleId !== this.props.classe.enumCycleId ||
      this.state.classe.name !== nextProps.classe.name ||
      this.state.classe.enumCycleId !== nextProps.classe.enumCycleId
    );
  }

  componentWillUpdate(nextProps, nextState) {
    // Si shouldComponentUpdate => true
    this.setState({
      classe: {
        id: nextProps.classe.id,
        name: nextProps.classe.name,
        enumCycleId: nextProps.classe.enumCycleId
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Une fois que le component s'est update
  }

  addClasse = event => {
    event.preventDefault();
    if (this.state.classe.name !== '' && this.state.classe.enumCycleId !== '') {
      this.props.onFormSubmit(this.state.classe);
      this.setState({
        classe: { id: null, name: '', enumCycleId: '' }
      });
    }
  };

  render() {
    let options = ENUM_CYCLES.map((c, i) => {
      return (
        <option value={c.id} key={c.id}>
          {c.literal}
        </option>
      );
    });

    let disabled = false;
    if (this.props.loading && !this.props.error) {
      disabled = true;
    }

    return (
      <div className="panel-group">
        <form className="form-horizontal" onSubmit={this.addClasse}>
          <div className={this.props.styleForm}>
            <div className="panel-heading">{this.props.headingForm}</div>
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="name">Nom classe :</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={this.state.classe.name}
                  onChange={this.props.handleChangeNomClasse}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  name="enumCycleId"
                  id="enumCycleId"
                  value={this.state.classe.enumCycleId}
                  onChange={this.props.handleChangeCycle}
                  required>
                  <option value="">Cycles</option>
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

GestionClassesForm.propTypes = {
  classe: PropTypes.object,
  cycles: PropTypes.arrayOf(PropTypes.string)
};

export default GestionClassesForm;
