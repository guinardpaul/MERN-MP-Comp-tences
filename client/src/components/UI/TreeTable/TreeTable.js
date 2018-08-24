import React, { Component } from 'react';
import { ENUM_DOMAINE_COMPETENCE_VALUE } from '../../../models/enums';

class TreeTable extends Component {
  state = {
    expandedRows: []
  };

  handleUpdate(obj) {
    let typeObj = '';

    if (obj.hasOwnProperty('sous_domaine_id')) {
      if (obj.sous_domaine_id === null || obj.sous_domaine_id === undefined) {
        console.log('[Domaine] updated: ', obj);
        typeObj = ENUM_DOMAINE_COMPETENCE_VALUE[0];
      } else {
        console.log('[Sous-Domaine] updated: ', obj);
        typeObj = ENUM_DOMAINE_COMPETENCE_VALUE[1];
      }
    } else if (obj.hasOwnProperty('domaine_id')) {
      console.log('[Competence] updated: ', obj);
      typeObj = ENUM_DOMAINE_COMPETENCE_VALUE[2];
    } else {
      console.log('[Domaine] updated: ', obj);
      typeObj = ENUM_DOMAINE_COMPETENCE_VALUE[0];
    }

    this.props.handleUpdate(obj, typeObj);
  }

  handleDelete(obj) {
    let typeObj = '';

    if (obj.hasOwnProperty('sous_domaine_id')) {
      if (obj.sous_domaine_id === null || obj.sous_domaine_id === undefined) {
        console.log('[Domaine] updated: ', obj);
        typeObj = 'Domaine';
      } else {
        console.log('[Sous-Domaine] updated: ', obj);
        typeObj = 'Sous-domaine';
      }
    } else if (obj.hasOwnProperty('domaine_id')) {
      console.log('[Competence] updated: ', obj);
      typeObj = 'Competence';
    } else {
      console.log('[Domaine] updated: ', obj);
      typeObj = 'Domaine';
    }

    this.props.handleDelete(obj, typeObj);
  }

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    const expandButtonCss = ['btn', 'btn-sm'];
    let expandButtonTitle = this.state.expandedRows.includes(item.id)
      ? '-'
      : '+';
    let expandButtonCssItem = this.state.expandedRows.includes(item.id)
      ? ['btn', 'btn-sm', 'btn-secondary']
      : ['btn', 'btn-sm', 'btn-info'];

    if (this.state.expandedRows.includes(item.id)) {
      expandButtonTitle = '-';
      expandButtonCss.push('btn-secondary');
    } else {
      expandButtonTitle = '+';
      expandButtonCss.push('btn-info');
    }

    const cssBtn = 'btn btn-sm';

    let actionsButton;
    this.props.editionMode
      ? (actionsButton = (
          <div className="btn-group-vertical">
            <button
              className={cssBtn + ' btn-warning'}
              onClick={() => this.handleUpdate(item)}>
              Modifier
            </button>
            <button
              className={cssBtn + ' btn-danger'}
              onClick={() => this.handleDelete(item)}>
              Supprimer
            </button>
          </div>
        ))
      : (actionsButton = '');

    const clickCallback = () => this.handleRowClick(item.id);
    const itemRows = [
      <tr key={item.id + item.ref}>
        <td>
          <button
            className={expandButtonCssItem.join(' ')}
            onClick={clickCallback}>
            {expandButtonTitle}
          </button>
        </td>
        <td>{item.ref}</td>
        <td>{item.description}</td>
        <td>{actionsButton}</td>
      </tr>
    ];

    if (this.state.expandedRows.includes(item.id)) {
      this.props.listDomaines
        .filter(
          d => d.cycle_id === item.cycle_id && d.sous_domaine_id === item.id
        )
        .forEach(d => {
          const clickSousDomaineCallback = () => this.handleRowClick(d.id);
          let actionsButton;
          this.props.editionMode
            ? (actionsButton = (
                <div className="btn-group-vertical">
                  <button
                    className={cssBtn + ' btn-warning'}
                    onClick={() => this.handleUpdate(d)}>
                    Modifier
                  </button>
                  <button
                    className={cssBtn + ' btn-danger'}
                    onClick={() => this.handleDelete(d)}>
                    Supprimer
                  </button>
                </div>
              ))
            : (actionsButton = '');
          const expandButtonTitle = this.state.expandedRows.includes(d.id)
            ? '-'
            : '+';
          itemRows.push(
            <tr key={d.id + d.ref}>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={clickSousDomaineCallback}>
                  {expandButtonTitle}
                </button>
              </td>
              <td />
              <td>{d.description}</td>
              <td>{actionsButton}</td>
            </tr>
          );

          if (this.state.expandedRows.includes(d.id)) {
            this.props.listCompetences
              .filter(
                ct => ct.cycle_id === d.cycle_id && ct.domaine_id === d.id
              )
              .forEach(ct => {
                let actionsButton;
                this.props.editionMode
                  ? (actionsButton = (
                      <div className="btn-group-vertical">
                        <button
                          className={cssBtn + ' btn-warning'}
                          onClick={() => this.handleUpdate(ct)}>
                          Modifier
                        </button>
                        <button
                          className={cssBtn + ' btn-danger'}
                          onClick={() => this.handleDelete(ct)}>
                          Supprimer
                        </button>
                      </div>
                    ))
                  : (actionsButton = '');
                itemRows.push(
                  <tr key={ct.id + ct.ref}>
                    <td />
                    <td>{ct.ref}</td>
                    <td>{ct.description}</td>
                    <td>{actionsButton}</td>
                  </tr>
                );
              });
          }
        });

      this.props.listCompetences
        .filter(
          ct => ct.cycle_id === item.cycle_id && ct.domaine_id === item.id
        )
        .forEach(ct => {
          let actionsButton;
          this.props.editionMode
            ? (actionsButton = (
                <div className="btn-group-vertical">
                  <button
                    className={cssBtn + ' btn-warning'}
                    onClick={() => this.handleUpdate(ct)}>
                    Modifier
                  </button>
                  <button
                    className={cssBtn + ' btn-danger'}
                    onClick={() => this.handleDelete(ct)}>
                    Supprimer
                  </button>
                </div>
              ))
            : (actionsButton = '');
          itemRows.push(
            <tr key={ct.id + ct.ref}>
              <td />
              <td>{ct.ref}</td>
              <td>{ct.description}</td>
              <td>{actionsButton}</td>
            </tr>
          );
        });
    }

    return itemRows;
  }

  render() {
    let allRowItems = [];
    this.props.data.forEach(item => {
      const itemPerRow = this.renderItem(item);
      allRowItems = allRowItems.concat(itemPerRow);
    });

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-1">#</th>
            <th className="col-md-1">Ref</th>
            <th className="col-md-9">Description</th>
            {this.props.editionMode ? (
              <th className="col-md-1">Actions</th>
            ) : null}
          </tr>
        </thead>
        <tbody>{allRowItems}</tbody>
      </table>
    );
  }
}

export default TreeTable;
