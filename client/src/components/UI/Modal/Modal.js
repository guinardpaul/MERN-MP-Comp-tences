import React, { Component } from 'react';

import './Modal.css';
import Aux from '../../../hoc/Auxil/Auxil';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentWillUpdate() {
    console.log('Modal.js will update');
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        {this.props.show ?
          <div
            className="Modal"
            style={{
              transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
              opacity: this.props.show ? '1' : '0'
            }}>
            {this.props.children}
          </div> : null
        }
      </Aux>
    );
  }
}

export default Modal;
