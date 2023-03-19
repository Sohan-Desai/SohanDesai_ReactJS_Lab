import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import ShowData from './Components/ShowList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowData/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
