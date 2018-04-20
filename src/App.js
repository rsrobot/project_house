import React, { Component } from 'react';
import Chat from "./Chat";
import Navbar from "./Navbar";
import { Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <row>
          <Chat/>
        </row>
      </div>
    );
  }
}

export default App;