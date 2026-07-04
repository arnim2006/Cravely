import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, publicOnly = false, partnerOnly = false, userOnly = false }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#09090b',
        color: '#fafafa',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #27272a',
          borderTop: '4px solid #ff385c',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <span style={{ fontSize: '0.9rem', color: '#a1a1aa', fontWeight: 500 }}>Loading Cravely...</span>
      </div>
    );
  }

  if (publicOnly) {
    if (user) {
      if (role === 'foodpartner') {
        return <Navigate to="/create-food" replace />;
      }
      return <Navigate to="/" replace />;
    }
    return children;
  }

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  if (partnerOnly && role !== 'foodpartner') {
    return <Navigate to="/" replace />;
  }

  if (userOnly && role !== 'user') {
    return <Navigate to="/create-food" replace />;
  }

  return children;
};

export default ProtectedRoute;
