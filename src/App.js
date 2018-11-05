import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm />
      </div>
    );
  }
}

export default App;
