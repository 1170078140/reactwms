import React, { Component } from 'react';

class QualityManagement extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      msg:'QualityManagement'
     };
  }
  render() {
    return (
      <div>{this.state.msg}</div>
    );
  }
}

export default QualityManagement;