// src/pages/ManagerLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../customer/CustomerSignUp.css";

export default function ManagerLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/manager/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.username, // backend expects 'name'
            password: form.password,
          }),
        }
      );

      if (res.ok) {
        const manager = await res.json();

        // save manager info in localStorage
        localStorage.setItem(
          "auth",
          JSON.stringify({
            id: manager.id,
            name: manager.name,
            role: "manager",
          })
        );
        localStorage.setItem("managerId", String(manager.id));

        navigate("/managerhome");
      } else if (res.status === 401) {
        setError("Invalid username or password.");
      } else {
        const text = await res.text();
        setError(text || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Manager Login</h2>
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
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      {error && <div className="error-msg">{error}</div>}
    </div>
  );
}
