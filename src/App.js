import React, { Component }  from 'react';
import './App.css';
import Index from './components/Index'
import { BrowserRouter as Router } from 'react-router-dom';
require('dotenv').config()

class App extends Component {
 
  render(){
    return(
      <Router>
        <Index  />
      </Router>
    );
  }
}

export default App;
