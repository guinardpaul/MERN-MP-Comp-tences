import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EvaluationForm extends Component {
  state = {
    selectedCompetences: [],
    evaluation: {
      id: null,
      description: '',
      created_at: '',
      classe_id: null,
      cycle_id: null,
      trimestre_id: ''
    }
  };

  componentDidMount() {
    this.setState({
      evaluation: { ...this.props.evaluation }
      // selectedCompetences: this.props.selectedCompetences
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.evaluation.description !== this.props.evaluation.description ||
      nextProps.evaluation.created_at !== this.props.evaluation.created_at ||
      nextProps.evaluation.trimestre_id !==
        this.props.evaluation.trimestre_id ||
      nextProps.evaluation.classe_id !== this.props.evaluation.classe_id ||
      nextProps.evaluation.cycle_id !== this.props.evaluation.cycle_id ||
      this.state.evaluation.description !== nextProps.evaluation.description ||
      this.state.evaluation.created_at !== nextProps.evaluation.created_at ||
      this.state.evaluation.trimestre_id !==
        nextProps.evaluation.trimestre_id ||
      this.state.evaluation.classe_id !== nextProps.evaluation.classe_id ||
      this.state.evaluation.cycle_id !== nextProps.evaluation.cycle_id ||
      nextProps.headingForm !== this.props.headingForm ||
      nextProps.styleForm !== this.props.styleForm ||
      nextState.selectedCompetences !== this.state.selectedCompetences
    );
  }

  componentWillUpdate(nextProps, nextState) {
    // Si shouldComponentUpdate => true
    this.setState({
      evaluation: {
        id: nextProps.evaluation.id,
        description: nextProps.evaluation.description,
        created_at: nextProps.evaluation.created_at,
        trimestre_id: nextProps.evaluation.trimestre_id,
        classe_id: nextProps.evaluation.classe_id,
        cycle_id: nextProps.evaluation.cycle_id
      },
      selectedCompetences: nextState.selectedCompetences
    });
  }

  handleChangeCompetence = event => {
    const selectedComp = parseInt(event.target.value, 10);
    const prevState = [...this.state.selectedCompetences];
    if (prevState.includes(selectedComp)) {
      prevState.splice(prevState.indexOf(selectedComp));
    } else {
      prevState.push(selectedComp);
    }
    this.setState(
      {
        selectedCompetences: prevState
      },
      () => console.log(this.state.selectedCompetences)
    );
  };

  submit = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.evaluation);
    this.props.handleChangeCompetence(this.state.selectedCompetences);
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
                  onChange={this.props.handleChangeTrimestre}
                  required>
                  <option value="">Trimestre</option>
                  {options}
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  multiple="multiple"
                  name="competence"
                  id="competence"
                  value={this.state.selectedCompetences}
                  onChange={event => this.handleChangeCompetence(event)}
                  required>
                  {this.props.listCompetences.map(ct => {
                    return (
                      <option value={ct.id} key={ct.id}>
                        {ct.ref + ' - ' + ct.description}
                      </option>
                    );
                  })}
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
