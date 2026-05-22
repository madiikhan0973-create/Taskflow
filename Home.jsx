// ─── pages/Home.jsx ───────────────────────────────────────────────────────────
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const Home = () => {
  const [products, setProducts]   = useState([]);
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('');
  const [loading, setLoading]     = useState(true);

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'];

  const fetchProducts = async () => {
    setLoading(true);
    const params = {};
    if (search)   params.search   = search;
    if (category) params.category = category;
    const { data } = await axios.get(`${API}/products`, { params });
    setProducts(data.products || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0f3460,#16213e)', borderRadius: 16,
        padding: '40px 32px', marginBottom: 32, color: '#fff', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 32 }}>Welcome to ShopEase</h1>
        <p style={{ margin: '0 0 24px', color: '#b0c4de' }}>Discover thousands of products at great prices</p>
        <form onSubmit={handleSearch} style={{ display: 'flex', maxWidth: 500, margin: '0 auto', gap: 8 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: 'none', fontSize: 14 }} />
          <button type="submit" style={{ background: '#e94560', color: '#fff', border: 'none',
            borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontWeight: 700 }}>
            Search
          </button>
        </form>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        <button onClick={() => setCategory('')} style={catBtn(category === '')}>All</button>
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)} style={catBtn(category === c)}>{c}</button>
        ))}
      </div>

      {/* Products grid */}
      {loading ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>Loading products…</p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>No products found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 20 }}>
          {products.map((p) => (
            <Link key={p._id} to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={productCard}>
                <div style={{ height: 160, background: '#f3f4f6', borderRadius: 8, marginBottom: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                  🛍️
                </div>
                <span style={{ fontSize: 11, color: '#e94560', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {p.category}
                </span>
                <h3 style={{ margin: '4px 0 8px', fontSize: 15, color: '#1a1a2e' }}>{p.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: '#0f3460', fontSize: 18 }}>PKR {p.price.toLocaleString()}</span>
                  <span style={{ fontSize: 12, color: p.stock > 0 ? '#10b981' : '#ef4444' }}>
                    {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const productCard = { background: '#fff', borderRadius: 12, padding: 16,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'transform .2s',
  cursor: 'pointer' };
const catBtn = (active) => ({
  background: active ? '#0f3460' : '#f3f4f6',
  color: active ? '#fff' : '#374151',
  border: 'none', borderRadius: 20, padding: '6px 16px', cursor: 'pointer',
  fontWeight: 600, fontSize: 13,
});

export default Home;
