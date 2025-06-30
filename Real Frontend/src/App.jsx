// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import About from './components/about';
import Shop from './components/shop';
import PetForm from './components/PetForm';
import Login from './components/Login';
import Signup from './components/Signup';
// import Contact from './components/Contact'; // ADD THIS LINE if you have Contact.jsx

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/add-pet" element={<PetForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/contact" element={<Contact />} /> ADD THIS LINE */}
      </Routes>
    </Router>
  );
}

export default App;
