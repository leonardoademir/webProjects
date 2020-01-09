import React from 'react';
import Routes from './routes';

import api from './services/api'
import Header from './components/Header';
import Main from './pages/main';

import "./styles.css";


const App = () => (
  <div className="App">
    <Header></Header>
    <Routes></Routes>
  </div>
)
export default App;
