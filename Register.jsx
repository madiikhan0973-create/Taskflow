// ─── Register.jsx ─────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Register = () => {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]   = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: 400, margin: '60px auto' }}>
      <div style={card}>
        <h2 style={{ textAlign: 'center', color: '#1a1a2e', marginBottom: 24 }}>Create Account</h2>
        {error && <div style={errBox}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {['name','email','password'].map((field) => (
            <div key={field}>
              <label style={label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                required placeholder={field === 'name' ? 'Your full name' : field === 'email' ? 'you@email.com' : '••••••••'}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                style={input} />
            </div>
          ))}
          <button type="submit" disabled={loading} style={btn}>
            {loading ? 'Creating account…' : 'Register'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: '#6b7280' }}>
          Already have an account? <Link to="/login" style={{ color: '#0f3460' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

const card   = { background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' };
const label  = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };
const input  = { display: 'block', width: '100%', padding: '11px 14px', marginBottom: 16, borderRadius: 8,
  border: '1px solid #e5e7eb', fontSize: 14, boxSizing: 'border-box' };
const btn    = { width: '100%', background: '#0f3460', color: '#fff', border: 'none', borderRadius: 8,
  padding: '12px', cursor: 'pointer', fontWeight: 700, fontSize: 15 };
const errBox = { background: '#fee2e2', color: '#dc2626', borderRadius: 8, padding: '10px 14px',
  marginBottom: 16, fontSize: 13 };

export default Register;
