import React, { Component } from 'react';

class ReceiptList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      msg:'receipt-list'
     };
  }
  render() {
    return (
      <div>{this.state.msg}</div>
    );
  }
}

export default ReceiptList;