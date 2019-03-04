import React, { Component } from 'react';

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      msg:'库存明细查询'
     };
  }
  render() {
    return (
      <div>{this.state.msg}</div>
    );
  }
}

export default Inventory;