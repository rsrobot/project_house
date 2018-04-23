import React, { Component } from 'react';
import Cal1 from "./Cal1";
import Navbar from "./Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <row>
          <Cal1/>
        </row>
      </div>
    );
  }
}

export default App;