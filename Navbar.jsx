import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount }    = useCart();
  const navigate         = useNavigate();

  return (
    <nav style={{ background: '#0f3460', padding: '0 24px', height: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 12px rgba(0,0,0,0.25)', position: 'sticky', top: 0, zIndex: 100 }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: 22, letterSpacing: 1 }}>
        Shop<span style={{ color: '#e94560' }}>Ease</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link to="/" style={navLink}>Products</Link>
        {user && <Link to="/orders" style={navLink}>My Orders</Link>}
        {user ? (
          <>
            <Link to="/cart" style={{ ...navLink, position: 'relative' }}>
              🛒 Cart
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: -8, right: -10, background: '#e94560',
                  color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 11,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <span style={{ color: '#b0c4de', fontSize: 13 }}>{user.name}</span>
            <button onClick={() => { logout(); navigate('/'); }} style={logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    style={navLink}>Login</Link>
            <Link to="/register" style={{ ...navLink, background: '#e94560', borderRadius: 6, padding: '6px 14px', fontWeight: 700 }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const navLink   = { color: '#d0d8e8', textDecoration: 'none', fontSize: 14, fontWeight: 500, position: 'relative' };
const logoutBtn = { background: 'transparent', color: '#e94560', border: '1px solid #e94560',
  borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 13, fontWeight: 600 };

export default Navbar;
