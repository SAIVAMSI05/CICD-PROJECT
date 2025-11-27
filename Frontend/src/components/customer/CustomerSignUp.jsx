import React, { useState } from 'react';
import './CustomerSignUp.css';

export default function CustomerSignUp() {
  const [form, setForm] = useState({ username: '', password: '', phone: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'User registered successfully!');
      } else {
        setError(data.error || 'Signup failed.');
      }
    } catch (err) {
      setError('Network error.');
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <h2>Customer Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {message && <div className="success-msg">{message}</div>}
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
}
