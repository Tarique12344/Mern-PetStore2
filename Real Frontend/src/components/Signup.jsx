import React, { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Signup successful! You can now log in.');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error during signup');
    }
  };

  return (
    <div className="container mt-5">
      <h2>📝 Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="email" className="form-control my-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control my-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Signup;