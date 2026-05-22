import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar      from './components/Navbar';
import Home        from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage    from './pages/CartPage';
import LoginPage   from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage  from './pages/OrdersPage';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
            <Routes>
              <Route path="/"              element={<Home />} />
              <Route path="/product/:id"  element={<ProductPage />} />
              <Route path="/login"        element={<LoginPage />} />
              <Route path="/register"     element={<RegisterPage />} />
              <Route path="/cart"         element={<PrivateRoute><CartPage /></PrivateRoute>} />
              <Route path="/orders"       element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
