import logo from './logo.svg';
import './App.css';
import React from 'react';
import GroceryList from './components/GroceryList';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <GroceryList/>

  }
}

export default App;

