import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerSignUp.css';

export default function CustomerLogin() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
                `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message || 'Login successful!');
                navigate('/CustomerHome');
            } else {
                setError(data.error || 'Login failed.');
            }
        } catch (err) {
            setError('Network error.');
        }

        setLoading(false);
    };

    return (
        <div className="signup-container">
            <h2>Customer Login</h2>
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging In...' : 'Login'}
                </button>
            </form>

            {message && <div className="success-msg">{message}</div>}
            {error && <div className="error-msg">{error}</div>}
        </div>
    );
}
