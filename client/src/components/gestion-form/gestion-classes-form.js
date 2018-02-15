import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GestionClassesForm extends Component {
  state = {
    classe: { _id: null, nom_classe: '', cycle: '' },
    cycles: ['Cycle 3', 'Cycle 4']
  };

  componentDidMount() {
    this.setState({
      classe: {
        _id: this.props.classe._id,
        nom_classe: this.props.classe.nom_classe,
        cycle: this.props.classe.cycle
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.classe.nom_classe !== this.props.classe.nom_classe ||
      nextProps.classe.cycle !== this.props.classe.cycle ||
      this.state.classe.nom_classe !== nextProps.classe.nom_classe ||
      this.state.classe.cycle !== nextProps.classe.cycle
    );
  }

  componentWillUpdate(nextProps, nextState) {
    // Si shouldComponentUpdate => true
    this.setState({
      classe: {
        _id: nextProps.classe._id,
        nom_classe: nextProps.classe.nom_classe,
        cycle: nextProps.classe.cycle
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Une fois que le component s'est update
  }

  addClasse = event => {
    event.preventDefault();
    if (this.state.classe.nom_classe !== '' && this.state.classe.cycle !== '') {
      this.props.onFormSubmit(this.state.classe);
      this.setState({
        classe: { _id: null, nom_classe: '', cycle: '' }
      });
    }
  };

  render() {
    let options = this.state.cycles.map((c, i) => {
      return (
        <option value={c} key={i}>
          {c}
        </option>
      );
    });

    return (
      <div className="panel-group">
        <form className="form-horizontal" onSubmit={this.addClasse}>
          <div className={this.props.styleForm}>
            <div className="panel-heading">{this.props.headingForm}</div>
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="nom_classe">Nom classe :</label>
                <input
                  type="text"
                  className="form-control"
                  name="nom_classe"
                  id="nom_classe"
                  value={this.state.classe.nom_classe}
                  onChange={this.props.handleChangeNomClasse}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  name="cycle"
                  id="cycle"
                  value={this.state.classe.cycle}
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
