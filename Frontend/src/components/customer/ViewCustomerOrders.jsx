// ./components/customer/ViewCustomerOrders.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewCustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // ⚠️ Replace with actual logged-in user id from context/session
  const userId = 2;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE}/api/order/user/${userId}`);
        if (!res.ok) throw new Error(`Server ${res.status}`);
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <div style={{ maxWidth: 1000, margin: "20px auto", padding: "10px" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>My Orders</h2>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>}

      {orders.length === 0 && !loading && !error && (
        <p style={{ textAlign: "center", color: "#666" }}>No orders found.</p>
      )}

      {orders.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <thead style={{ background: "#f97316", color: "#fff" }}>
            <tr>
              <th style={{ padding: 10, textAlign: "left" }}>Order ID</th>
              <th style={{ padding: 10, textAlign: "left" }}>Food</th>
              <th style={{ padding: 10, textAlign: "left" }}>Quantity</th>
              <th style={{ padding: 10, textAlign: "left" }}>Status</th>
              <th style={{ padding: 10, textAlign: "left" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 10 }}>{o.id}</td>
                <td style={{ padding: 10 }}>{o.food?.name || "N/A"}</td>
                <td style={{ padding: 10 }}>{o.quantity}</td>
                <td style={{ padding: 10 }}>{o.status}</td>
                <td style={{ padding: 10 }}>{o.address || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <button
          onClick={() => navigate("/customerhome")}
          style={{
            padding: "8px 16px",
            background: "#f97316",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
