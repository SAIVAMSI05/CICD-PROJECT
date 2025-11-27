import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const BASE = import.meta.env.VITE_BACKEND_URL;

export default function OrderPage() {
  const { foodId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialFood = location.state?.food ?? null;

  const [food, setFood] = useState(initialFood);
  const [loadingFood, setLoadingFood] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const [userId, setUserId] = useState(localStorage.getItem('userId') ?? '');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (food) return;

    if (!foodId || String(foodId).startsWith('demo-')) {
      setFood({ id: foodId, name: `Demo ${foodId}`, price: 150, _isDemo: true });
      return;
    }

    let mounted = true;
    setLoadingFood(true);
    setLoadError(null);

    fetch(`${BASE}/api/food/${foodId}`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(data => { if (mounted) setFood(data); })
      .catch(err => { 
        console.error(err); 
        if (mounted) setLoadError('Failed to load food: ' + (err.message || err)); 
      })
      .finally(() => { if (mounted) setLoadingFood(false); });

    return () => { mounted = false; };
  }, [foodId, food]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!userId || Number(userId) <= 0) { setError('Please enter a valid user id (demo).'); return; }
    if (!food) { setError('No food selected.'); return; }
    if (!quantity || Number(quantity) <= 0) { setError('Quantity must be at least 1.'); return; }

    const isDemo = String(foodId).startsWith('demo-') || food._isDemo;

    const payload = {
      user: { id: Number(userId) },
      food: isDemo ? { id: null, name: food.name } : { id: Number(foodId) },
      quantity: Number(quantity),
      address: address || null
    };

    try {
      setSubmitting(true);

      if (isDemo) {
        setMessage('Demo order created locally (not persisted).');
        localStorage.setItem('userId', String(userId));
        setTimeout(() => navigate('/customerhome/orders'), 900);
        return;
      }

      const res = await fetch(`${BASE}/api/order/place`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Server ${res.status}`);
      }

      const created = await res.json();
      setMessage(`Order placed (ID: ${created.id ?? '—'})`);
      localStorage.setItem('userId', String(userId));
      setTimeout(() => navigate('/customerhome/orders'), 900);

    } catch (err) {
      console.error(err);
      setError('Failed to place order: ' + (err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingFood) return <div style={{ textAlign:'center', padding:20 }}>Loading food...</div>;
  if (loadError) return <div style={{ color:'crimson', padding:20 }}>{loadError}</div>;
  if (!food) return <div style={{ padding:20 }}>No food selected.</div>;

  return (
    <div style={{ display:'flex', justifyContent:'center', marginTop:24 }}>
      <div style={{ maxWidth:560, width:'100%', padding:22, border:'1px solid #e6e6e6', borderRadius:10, background:'#fff' }}>
        <h2 style={{ textAlign:'center' }}>Order Food</h2>

        <div style={{ textAlign:'center', marginBottom:12 }}>
          <strong style={{ fontSize:18 }}>{food.name}</strong>
          <div style={{ color:'#666', marginTop:6 }}>Price: ₹{food.price ?? '—'}</div>
        </div>

        <form onSubmit={handlePlaceOrder} style={{ display:'grid', gap:12 }}>
          <label style={{ display:'grid', gap:6 }}>
            <span style={{ fontWeight:600 }}>Your User ID</span>
            <input 
              value={userId}
              onChange={e=>setUserId(e.target.value)}
              placeholder="Enter your user id (demo)"
              style={{ padding:10, borderRadius:6, border:'1px solid #ccc' }}
            />
          </label>

          <label style={{ display:'grid', gap:6 }}>
            <span style={{ fontWeight:600 }}>Quantity</span>
            <input 
              type="number" 
              min="1" 
              value={quantity}
              onChange={e=>setQuantity(e.target.value)}
              style={{ padding:10, borderRadius:6, border:'1px solid #ccc' }} 
            />
          </label>

          <label style={{ display:'grid', gap:6 }}>
            <span style={{ fontWeight:600 }}>Delivery Address (optional)</span>
            <textarea 
              rows="3" 
              value={address}
              onChange={e=>setAddress(e.target.value)}
              placeholder="Enter delivery address (optional)"
              style={{ padding:10, borderRadius:6, border:'1px solid #ccc' }} 
            />
          </label>

          {error && <div style={{ color:'crimson', fontWeight:600 }}>{error}</div>}
          {message && <div style={{ color:'green', fontWeight:600 }}>{message}</div>}

          <div style={{ display:'flex', gap:10 }}>
            <button 
              type="submit" 
              disabled={submitting}
              style={{ flex:1, padding:'12px 14px', background:'#ff8c00', color:'#fff', border:'none', borderRadius:6, fontWeight:700 }}
            >
              {submitting ? 'Placing...' : 'Place Order'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/customerhome')}
              style={{ padding:'12px 14px', borderRadius:6, border:'1px solid #ccc', background:'#fff' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
