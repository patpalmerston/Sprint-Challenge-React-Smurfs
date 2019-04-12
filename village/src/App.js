import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'

import axios from 'axios'

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        console.log(res);
        this.setState({
          smurfs: res.data
        });
      })
      .catch(function(err) {
        console.log(err)
      });
  }
  

  handleData = data => {
    console.log(data, 'handleData')
    this.setState({ smurfs: data })
  }
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <nav>
          <h1 className='smurf-header'>Welcome Home!</h1>
          <div>
            <NavLink exact to='/'>Home</NavLink>
            <NavLink to='/smurf-form'>Add Smurf</NavLink>
          </div>
        </nav>

        <SmurfForm
          path='/smurf-form'  
          handleData={this.handleData}
        />

        <Route
          exact 
          path='/' 
          render={props => (
            <Smurfs 
              smurfs={this.state.smurfs} 
              handleData={this.handleData} 
            />
          )} 
        />
        
      </div>
    );
  }
}

export default App;
