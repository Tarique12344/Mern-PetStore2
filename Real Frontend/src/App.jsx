// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetForm from './components/PetForm';
import Home from './components/HomePage';
import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-pet" element={<PetForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
