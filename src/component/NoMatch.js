import React, { Component } from 'react';

class NoMatch extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      msg:'404'
     };
  }
  render() {
    return (
      <div className="noMatchPage">404</div>
    );
  }
}

export default NoMatch;