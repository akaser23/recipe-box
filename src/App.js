import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';

function App() {
  return (
    <div>
      <Nav></Nav>
      <main>
        <Home></Home>
      </main>
    </div>
  );
}

export default App;
