import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminForm.css";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
        {
          email: form.email,
          password: form.password,
        }
      );
      setMessage("Login successful!");
      navigate("/admin/home");
    } catch (err) {
      setMessage(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="admin-form-container">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
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
        <button type="submit">Login</button>
        <div>{message}</div>
      </form>
    </div>
  );
};

export default AdminLogin;
