import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EvaluationForm extends Component {
  state = {
    evaluation: {}
  };

  componentWillMount() {
    this.setState({
      evaluation: { ...this.props.evaluation }
    });
  }

  submit = event => {
    event.preventDefault();
  };

  render() {
    const options = this.props.enumTrimestres.map((tr, i) => {
      return (
        <option value={tr.id} key={i}>
          {tr.literal}
        </option>
      );
    });

    return (
      <div className="panel-group">
        <form
          className="form-horizontal"
          onSubmit={event => this.submit(event)}>
          <div className={this.props.styleForm}>
            <div className="panel-heading">{this.props.headingForm}</div>
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="description">Description :</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  value={this.state.evaluation.description}
                  onChange={this.props.handleChangeDescription}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="created_at">Date de création :</label>
                <input
                  type="date"
                  className="form-control"
                  name="created_at"
                  id="created_at"
                  value={this.state.evaluation.created_at}
                  onChange={this.props.handleChangeCreatedAt}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  name="trimestre_id"
                  id="trimestre_id"
                  value={this.state.evaluation.trimestre_id}
                  onChange={this.props.handleChangeClasse}
                  required>
                  <option value="">Trimestre</option>
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

export default EvaluationForm;
