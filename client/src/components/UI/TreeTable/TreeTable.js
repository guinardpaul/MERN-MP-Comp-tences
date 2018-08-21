import React, { Component } from 'react';

class TreeTable extends Component {
  state = {
    expandedRows: []
  };

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    const expandButton = this.state.expandedRows.includes(item.id) ? '-' : '+';
    let actionsButton;
    this.props.editionMode
      ? (actionsButton = (
          <div>
            <button onClick={() => this.props.handleUpdate(item)}>
              Modifier
            </button>
            <button onClick={() => this.props.handleDelete(item)}>
              Supprimer
            </button>
          </div>
        ))
      : (actionsButton = '');
    const clickCallback = () => this.handleRowClick(item.id);
    const itemRows = [
      <tr key={item.id + item.ref}>
        <td>
          <button className="btn btn-sm btn-info" onClick={clickCallback}>
            {expandButton}
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
                <div>
                  <button onClick={() => this.props.handleUpdate(d)}>
                    Modifier
                  </button>
                  <button onClick={() => this.props.handleDelete(d)}>
                    Supprimer
                  </button>
                </div>
              ))
            : (actionsButton = '');
          const expandButton = this.state.expandedRows.includes(d.id)
            ? '-'
            : '+';
          itemRows.push(
            <tr key={d.id + d.ref}>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={clickSousDomaineCallback}>
                  {expandButton}
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
                      <div>
                        <button onClick={() => this.props.handleUpdate(ct)}>
                          Modifier
                        </button>
                        <button onClick={() => this.props.handleDelete(ct)}>
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
                <div>
                  <button onClick={() => this.props.handleUpdate(ct)}>
                    Modifier
                  </button>
                  <button onClick={() => this.props.handleDelete(ct)}>
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
