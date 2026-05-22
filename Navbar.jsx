import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav style={{
      background: '#0f3460', padding: '0 24px', height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: 20, letterSpacing: 1 }}>
        TaskFlow
      </Link>
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: '#b0c4de', fontSize: 14 }}>👋 {user.name}</span>
          <button onClick={handleLogout} style={{
            background: '#e94560', color: '#fff', border: 'none',
            borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13,
          }}>Logout</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login"    style={{ color: '#b0c4de', fontSize: 14, textDecoration: 'none' }}>Login</Link>
          <Link to="/register" style={{ color: '#fff', fontSize: 14, textDecoration: 'none', fontWeight: 600 }}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
