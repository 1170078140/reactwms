import React, { Component } from 'react';

class Pickpull extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      msg:'Pickpull'
     };
  }
  render() {
    return (
      <div>{this.state.msg}</div>
    );
  }
}

export default Pickpull;