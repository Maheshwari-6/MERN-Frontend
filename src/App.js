import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import HomePage from './components/HomePage';
import AddQuestion from './components/AddQuestion';
import './App.css';
import axios from 'axios';
import FullQuestion from './components/FullQuestion';

function App() {

  return (
    <div className="App">

<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/addQuestion" element={<AddQuestion />} />
          <Route path="/question/:id" element={<FullQuestion/>}/>
				</Routes>
			</BrowserRouter>
    </div>

    
  );

  

  
}

export default App;
