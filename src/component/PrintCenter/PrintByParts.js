import React, { Component } from 'react';

class PrintByParts extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      msg:'打印标签'
     };
  }
  render() {
    return (
      <div>{this.state.msg}</div>
    );
  }
}

export default PrintByParts;