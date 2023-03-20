import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShowData from './Components/ShowList';
import ExpenseTracker from './Components/ExpenseTracker';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowData/>}/>
        <Route path=':url' element={<ExpenseTracker onTrue={() => {}} onClose={() => {}}/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
