import React from 'react';
import Navbar from '../../components/navbar';
import Aux from '../Auxil/Auxil';
import classes from './Layout.css';

const Layout = props => (
  <Aux>
    <Navbar />
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default Layout;
