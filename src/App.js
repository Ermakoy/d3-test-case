import React, { Component } from 'react';
import { Sidebar } from './Sidebar';
import { Chartblock } from './Chartblock';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar left />
        <Chartblock className="chartblock" />
        <Sidebar right />
      </div>
    );
  }
}

export default App;
