// src/components/manager/ViewCustomerOrders.jsx
import React, { useEffect, useState } from "react";

const BASE = import.meta.env.VITE_BACKEND_URL;

export default function ViewCustomerOrdersManager({ managerId: propManagerId }) {
  const [orders, setOrders] = useState([]);
  const [raw, setRaw] = useState(null); // debug
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // priority: prop -> query param -> localStorage -> fallback null
  const urlParams = new URLSearchParams(window.location.search);
  const managerIdFromQs = urlParams.get("managerId");
  const storedManager = localStorage.getItem("managerId");
  const managerId = propManagerId || managerIdFromQs || storedManager || null;

  useEffect(() => {
    if (!managerId) {
      setError(
        "No managerId available. Set localStorage.managerId, pass as prop, or use ?managerId=2 in URL."
      );
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // Notice: SAME LOGIC, SAME manager id = 2 just like your code
        const url = `${BASE}/api/order/manager/${encodeURIComponent(2)}`;
        console.log("Manager orders fetch ->", url);

        const res = await fetch(url);
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Server ${res.status}: ${txt}`);
        }

        const data = await res.json();
        setRaw(data);
        setOrders(Array.isArray(data) ? data : data ? [data] : []);
      } catch (err) {
        console.error("Failed to load manager orders:", err);
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [managerId]);

  return (
    <div style={{ maxWidth: 1100, margin: "20px auto", padding: 16 }}>
      <h2 style={{ textAlign: "center" }}>Orders (manager id: {managerId ?? "—"})</h2>

      {!managerId && (
        <div style={{ color: "crimson", textAlign: "center", marginBottom: 12 }}>
          For quick testing run in DevTools:
          <pre style={{ display: "inline-block", marginLeft: 8 }}>
            localStorage.setItem('managerId','2')
          </pre>
        </div>
      )}

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p style={{ textAlign: "center", color: "#666" }}>
          No orders found for this manager.
        </p>
      )}

      {orders.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f6f6f6" }}>
            <tr>
              <th style={{ padding: 10, textAlign: "left" }}>Order ID</th>
              <th style={{ padding: 10, textAlign: "left" }}>Food</th>
              <th style={{ padding: 10, textAlign: "left" }}>Customer</th>
              <th style={{ padding: 10, textAlign: "left" }}>Qty</th>
              <th style={{ padding: 10, textAlign: "left" }}>Status</th>
              <th style={{ padding: 10, textAlign: "left" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const foodName = o.food?.name ?? (o.food?.id ? `#${o.food.id}` : "-");
              const customer =
                o.user?.name ?? (o.user?.id ? `User #${o.user.id}` : "-");

              return (
                <tr key={o.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 10 }}>{o.id}</td>
                  <td style={{ padding: 10 }}>{foodName}</td>
                  <td style={{ padding: 10 }}>{customer}</td>
                  <td style={{ padding: 10 }}>{o.quantity}</td>
                  <td style={{ padding: 10 }}>{o.status}</td>
                  <td style={{ padding: 10 }}>{o.address ?? "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {raw && (
        <pre
          style={{
            marginTop: 16,
            background: "#fafafa",
            padding: 12,
            borderRadius: 6,
            overflowX: "auto",
            fontSize: 12,
          }}
        >
          DEBUG RAW RESPONSE:
          {JSON.stringify(raw, null, 2)}
        </pre>
      )}
    </div>
  );
}
