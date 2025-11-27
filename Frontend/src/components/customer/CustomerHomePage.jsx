// src/components/customer/CustomerHomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.VITE_BACKEND_URL;

const DEMO_NAMES = [
  'Veg Biryani','Paneer Butter Masala','Chicken Curry','Masala Dosa',
  'Chole Bhature','Margherita Pizza','Veg Fried Rice','Gulab Jamun',
  'Samosa','Butter Naan','Rogan Josh','Mutton Biryani',
  'Fish Curry','Idli Sambhar','Pav Bhaji','Kathi Roll'
];

export default function CustomerHomePage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchFoods = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE}/api/food/all`);
        if (!res.ok) throw new Error(`Server ${res.status}`);
        const data = await res.json();

        const avail = (Array.isArray(data) ? data : []).filter(f => {
          const a = (f.availability ?? f.available ?? '').toString();
          return a.toUpperCase() === 'YES';
        });

        if (mounted) setFoods(avail);
      } catch (err) {
        console.error(err);
        if (mounted) setError('Failed to load foods: ' + (err.message || err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchFoods();
    return () => { mounted = false; };
  }, []);

  const gridItems = React.useMemo(() => {
    const real = Array.isArray(foods) ? foods.slice() : [];
    const items = [...real];

    for (let i = items.length; i < 16; i++) {
      const name = DEMO_NAMES[i % DEMO_NAMES.length];
      items.push({
        id: `demo-${i}`,
        name,
        price: 100 + ((i % 6) * 50),
        availability: 'YES',
        _isDemo: true
      });
    }
    return items;
  }, [foods]);

  if (loading) return <div style={{ textAlign:'center', marginTop:20 }}>Loading...</div>;
  if (error) return <div style={{ color:'crimson', textAlign:'center', marginTop:20 }}>{error}</div>;

  return (
    <div style={{ maxWidth: 1200, margin: '8px auto 80px', padding: '12px 16px' }}>
      <h2 style={{ textAlign: 'center', marginTop: 6 }}>Available Foods</h2>

      <div id="foods-grid"
        style={{ marginTop: 18, display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
        
        {gridItems.map((f, idx) => {
          const name = f.name || `Food ${idx+1}`;
          const imgSrc = `https://source.unsplash.com/600x400/?food,${encodeURIComponent(name)}`;
          
          return (
            <div
              key={String(f.id)+'-'+idx}
              style={{
                border:'1px solid #e6e6e6', borderRadius:10, padding:12,
                textAlign:'center', background:'#fff', minHeight:300,
                display:'flex', flexDirection:'column', justifyContent:'space-between'
              }}
            >
              <div>
                <img
                  src={imgSrc}
                  alt={name}
                  style={{ width:'100%', height:160, objectFit:'cover', borderRadius:8 }}
                  onError={e=>{ e.target.onerror=null; e.target.src='https://via.placeholder.com/600x400?text=Food'; }}
                />
                <h4 style={{ margin: '12px 0 6px' }}>{name}</h4>
                <div style={{ color:'#666' }}>₹{f.price ?? '—'} • {(f.availability ?? f.available) || 'NO'}</div>
              </div>

              <div style={{ marginTop:12 }}>
                <Link to={`/customerhome/order/${f.id}`} state={{ food: f }} style={{ textDecoration:'none' }}>
                  <button
                    type="button"
                    style={{
                      padding:'8px 16px', borderRadius:8, border:'none',
                      background:'#ff8c00', color:'#fff', cursor:'pointer', fontWeight:700
                    }}
                  >
                    Order
                  </button>
                </Link>
              </div>
            </div>
          );
        })}

      </div>

      <style>{`
        @media (max-width:1100px){ #foods-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width:800px){ #foods-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width:480px){ #foods-grid { grid-template-columns: repeat(1,1fr) !important; } }
      `}</style>
    </div>
  );
}
