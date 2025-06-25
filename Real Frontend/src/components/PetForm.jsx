import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import NavigationBar from './NavigationBar'; // Uncomment if you have a Navbar component

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
        navigate('/shop'); // Update this path if needed
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
      {/* Optional Navigation Bar */}
      {/* <NavigationBar /> */}

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow">
              <h2 className="text-center mb-4">Add a Pet</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="petName" className="form-label">Pet Name:</label>
                  <input
                    id="petName"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="petType" className="form-label">Pet Type:</label>
                  <input
                    id="petType"
                    type="text"
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="petBreed" className="form-label">Breed:</label>
                  <input
                    id="petBreed"
                    type="text"
                    className="form-control"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="petAge" className="form-label">Age:</label>
                  <input
                    id="petAge"
                    type="number"
                    className="form-control"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="petDescription" className="form-label">Description:</label>
                  <textarea
                    id="petDescription"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="petImage" className="form-label">Image URL:</label>
                  <input
                    id="petImage"
                    type="url"
                    className="form-control"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                  />
                </div>

                <div className="text-center">
                  <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading ? 'Adding...' : 'Add Pet'}
                  </button>
                </div>

                {errorMessage && (
                  <p className="text-danger text-center mt-3">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetForm;
