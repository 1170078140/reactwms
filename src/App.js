import React, { Component } from 'react';
// import logo from './asset/image/logo.svg';
import './asset/css/App.css';
import './asset/css/index.css';
import Home from './component/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}

export default App;
