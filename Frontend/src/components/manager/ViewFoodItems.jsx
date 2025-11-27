import React, { useEffect, useState } from 'react';

export default function ViewFoodItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE = import.meta.env.VITE_BACKEND_URL;

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/api/food/all`);
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('Failed to load food items: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this food item?')) return;
    try {
      const res = await fetch(`${BASE}/api/food/delete/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Server ${res.status}`);
      }

      const msg = await res.text();
      console.log(msg);

      // update UI
      setItems(prev => prev.filter(it => it.id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed: ' + (err.message || err));
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '18px auto', padding: 18, background: '#fff', borderRadius: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>Food Items</h3>
        <button onClick={fetchItems}>Refresh</button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'crimson' }}>{error}</div>}

      {!loading && !error && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', background: '#faf5ef' }}>
                <th style={{ padding: 8 }}>ID</th>
                <th style={{ padding: 8 }}>Name</th>
                <th style={{ padding: 8 }}>Price</th>
                <th style={{ padding: 8 }}>Availability</th>
                <th style={{ padding: 8 }}>Manager ID</th>
                <th style={{ padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: 16, textAlign: 'center', color: '#666' }}>
                    No food items found.
                  </td>
                </tr>
              )}

              {items.map(it => (
                <tr key={it.id}>
                  <td style={{ padding: 8 }}>{it.id}</td>
                  <td style={{ padding: 8 }}>{it.name}</td>
                  <td style={{ padding: 8 }}>{it.price}</td>
                  <td style={{ padding: 8 }}>{it.availability ?? it.available}</td>
                  <td style={{ padding: 8 }}>{it.manager?.id ?? '—'}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => handleDelete(it.id)} style={{ color: 'red' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
