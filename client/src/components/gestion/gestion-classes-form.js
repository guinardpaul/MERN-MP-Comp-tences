import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Classe } from '../../models/classe';

class GestionClassesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classe: { nom_classe: '', cycle: '' },
      cycles: ['Cycle 3', 'Cycle 4']
    };

    this.addClasse = this.addClasse.bind(this);
    this.handleChangeNomClasse = this.handleChangeNomClasse.bind(this);
    this.handleChangeCycle = this.handleChangeCycle.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.classe) {
      this.setState({
        classe: { nom_classe: this.props.classe.nom_classe, cycle: this.props.classe.cycle }
      });
    }
    /* this.setState({
      classe: this.props.classe
    }); */
  }

  addClasse(event) {
    event.preventDefault();
    if (this.state.classe.nom_classe !== '' && this.state.classe.cycle !== '') {
      this.props.onFormSubmit(this.state.classe);
      this.setState({
        classe: { nom_classe: '', cycle: '' }
      });
    }
  }

  handleChangeNomClasse(event) {
    const newState = this.state.classe;
    this.setState({
      classe: {
        nom_classe: event.target.value,
        cycle: newState.cycle
      }
    });
  }

  handleChangeCycle(event) {
    const newState = this.state.classe;
    this.setState({
      classe: {
        nom_classe: newState.nom_classe,
        cycle: event.target.value
      }
    });
  }

  onCancel() {
    this.props.cancelForm();
  }

  render() {
    let options = this.state.cycles.map((c, i) => {
      return <option value={c} key={i}>{c}</option>
    });

    return (
      <div className="panel-group">
        <form className="form-horizontal" onSubmit={this.addClasse}>
          <div className={this.props.styleForm}>
            <div className="panel-heading">{this.props.headingForm}</div>
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="nom_classe">Nom classe :</label>
                <input type="text" className="form-control" name="nom_classe" id="nom_classe" value={this.state.classe.nom_classe}
                  onChange={this.handleChangeNomClasse} autoFocus required />
              </div>

              <div className="form-group">
                <select className="form-control" name="cycle" id="cycle" value={this.state.classe.cycle}
                  onChange={this.handleChangeCycle}>
                  <option value="">Cycles</option>
                  {options}
                </select>
              </div>

              <div className="form-group">
                <button type="submit" className={this.props.buttonStyle}>{this.props.buttonName}</button>
                <button onClick={this.onCancel} className="btn btn-default">Annuler</button>
              </div>
            </div>
          </div>
        </form>
      </div >
    );
  }
}

GestionClassesForm.propTypes = {
  addClasse: PropTypes.func,
  onCancel: PropTypes.func,
  styleForm: PropTypes.string,
  headingForm: PropTypes.string,
  buttonStyle: PropTypes.string,
  buttonName: PropTypes.string,
  classe: PropTypes.func,
  cycles: PropTypes.arrayOf(PropTypes.string),
  componentDidMount: PropTypes.func
};

export default GestionClassesForm;