import React from 'react';
import ReactTable from 'react-table';

const Table = props => {
  return <ReactTable data={props.data} columns={props.columns} />;
};

export default Table;
