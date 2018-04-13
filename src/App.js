import React, { Component } from 'react';

import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

console.log(2222222222)

console.log(4444444444)

console.log(555555555)


@connect(state => ({state}))
class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
