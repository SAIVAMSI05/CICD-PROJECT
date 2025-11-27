import React, { useState } from "react";
import axios from "axios";
import "./AdminForm.css";

const AdminSignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/register`,
        form
      );
      setMessage("Signup successful!");
    } catch (err) {
      setMessage(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="admin-form-container">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>Admin Sign Up</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <div>{message}</div>
      </form>
    </div>
  );
};

export default AdminSignUp;
