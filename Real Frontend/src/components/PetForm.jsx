import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/petform.css';
import '../styles/homepage.css'
import NavBar from './NavBar';
import Footer from './Footer';


const PetForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [breed, setBreed] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      name,
      type,
      description,
      age: Number(age),
      breed,
      image: imageURL
    };

    try {
      setLoading(true);
      setErrorMessage('');

      const response = await fetch('http://localhost:5000/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log('Pet added successfully');
        navigate('/shop');
      } else {
        console.error('Error adding pet:', response.statusText);
        setErrorMessage('Error adding pet. Please try again.');
      }
    } catch (error) {
      console.error('Error adding pet:', error.message);
      setErrorMessage('Error adding pet. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Banner */}
     <header>
        <div className="banner">Simple Pets</div>
      </header>

      {/* Navbar */}
  
      <NavBar />

      {/* Pet Form */}
      <div className="pet-form-wrapper">
        <h2>Add a Pet</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="petName">Pet Name:</label>
          <input
            id="petName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="petType">Pet Type:</label>
          <input
            id="petType"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />

          <label htmlFor="petBreed">Breed:</label>
          <input
            id="petBreed"
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />

          <label htmlFor="petAge">Age:</label>
          <input
            id="petAge"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label htmlFor="petDescription">Description:</label>
          <textarea
            id="petDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="petImage">Image URL:</label>
          <input
            id="petImage"
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />

          <button type="submit" disabled={loading} className="pet-form-button">
            {loading ? 'Adding...' : 'Add Pet'}
          </button>

          {errorMessage && (
            <p className="pet-form-error">{errorMessage}</p>
          )}
        </form>
      </div>
        <Footer />
    </div>
  );
};

export default PetForm;
