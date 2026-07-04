
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';

const ChooseRegister = () => {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" style={{ maxWidth: '460px', padding: 'var(--space-6) var(--space-6) var(--space-5)' }}>
        <header style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, var(--color-accent) 0%, #ff6b8b 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-3) auto',
            boxShadow: '0 4px 12px rgba(255, 56, 92, 0.3)'
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h1 className="auth-title" style={{ fontSize: '1.6rem', fontWeight: '800' }}>Welcome to Cravely</h1>
          <p className="auth-subtitle" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>Discover delicious food reels near you or register your kitchen to reach customers.</p>
        </header>

        <div style={{ display: 'grid', gap: '14px' }}>
          {/* User Option */}
          <Link to="/user/register" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(255, 56, 92, 0.08) 0%, rgba(255, 56, 92, 0.02) 100%)',
            border: '1.5px solid var(--color-accent)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 56, 92, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--color-accent)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </div>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ margin: '0 0 2px 0', fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-text)' }}>Join as Foodie</h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Browse mouth-watering food reels, like, and save favorites.</p>
            </div>
          </Link>

          {/* Partner Option */}
          <Link to="/food-partner/register" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface-alt)',
            border: '1.5px solid var(--color-border)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = 'var(--color-accent)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--color-surface-alt)',
              border: '2px solid var(--color-text-secondary)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ margin: '0 0 2px 0', fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-text)' }}>Join as Food Partner</h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Upload preparation videos, promote your store, and get orders.</p>
            </div>
          </Link>
        </div>

        <div className="auth-alt-action" style={{ marginTop: 'var(--space-4)' }}>
          Already have an account? <Link to="/user/login" style={{ color: 'var(--color-accent)', fontWeight: '700' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;
