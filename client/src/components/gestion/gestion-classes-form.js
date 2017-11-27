import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Classe } from '../../models/classe';

class GestionClassesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classe: Classe,
      cycles: ['Cycle 3', 'Cycle 4']
    };

    this.addClasse = this.addClasse.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.setState({
      classe: this.props.classe
    });
  }

  addClasse() {
    /* this.setState({
      classe:{

      }
    }) */
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
                <input type="text" className="form-control" name="nom_classe" id="nom_classe" value={this.props.classe.nom_classe} autoFocus required />
              </div>

              <div className="form-group">
                <select className="form-control" name="selectedCycle" id="selectedCycle">
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