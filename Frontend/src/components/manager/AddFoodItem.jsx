import React, { useState } from 'react';

export default function AddFoodItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState('YES'); // YES / NO
  const [managerId, setManagerId] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [createdFood, setCreatedFood] = useState(null);

  const resetForm = () => {
    setName('');
    setPrice('');
    setAvailability('YES');
  };

  const validate = () => {
    if (!name.trim()) return 'Name is required';
    if (!price.toString().trim()) return 'Price is required';
    const p = parseFloat(price);
    if (Number.isNaN(p) || p < 0) return 'Price must be a non-negative number';
    if (!managerId.toString().trim()) return 'Manager ID is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    const payload = {
      name: name.trim(),
      price: parseFloat(price),
      available: availability,
      manager: { id: Number(managerId) }
    };

    try {
      setSubmitting(true);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server returned ${res.status}`);
      }

      const data = await res.json();
      setCreatedFood(data);
      setMessage('Food item added successfully.');
      setError(null);
      resetForm();
    } catch (err) {
      console.error(err);
      setError('Failed to add food item: ' + (err.message || err));
      setMessage(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '18px auto', padding: 18, background: '#fff', borderRadius: 8 }}>
      <h3>Add Food Item</h3>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Veg Biryani"
            style={{ width: '100%', padding: 8, marginTop: 6 }}
          />
        </label>

        <label>
          Price
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., 159.99"
            style={{ width: '100%', padding: 8, marginTop: 6 }}
            inputMode="decimal"
          />
        </label>

        <label>
          Availability
          <select value={availability} onChange={(e) => setAvailability(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6 }}>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </label>

        <label>
          Manager ID
          <input
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
            placeholder="manager id (e.g., 1)"
            style={{ width: '100%', padding: 8, marginTop: 6 }}
            inputMode="numeric"
          />
        </label>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button type="submit" disabled={submitting} style={{ padding: '8px 14px', borderRadius: 6 }}>
            {submitting ? 'Adding...' : 'Add Food'}
          </button>

          <button
            type="button"
            onClick={() => { resetForm(); setMessage(null); setError(null); setCreatedFood(null); }}
            style={{ padding: '8px 12px', borderRadius: 6, background: '#f3f3f3' }}
          >
            Reset
          </button>
        </div>

        {message && <div style={{ color: 'green', marginTop: 8 }}>{message}</div>}
        {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}

        {createdFood && (
          <div style={{ marginTop: 12, padding: 12, background: '#fafafa', borderRadius: 6 }}>
            <strong>Created Food:</strong>
            <div>ID: {createdFood.id ?? '—'}</div>
            <div>Name: {createdFood.name}</div>
            <div>Price: {createdFood.price}</div>
            <div>Availability: {createdFood.availability ?? createdFood.available}</div>
            <div>Manager ID: {createdFood.manager?.id ?? '—'}</div>
          </div>
        )}
      </form>
    </div>
  );
}
