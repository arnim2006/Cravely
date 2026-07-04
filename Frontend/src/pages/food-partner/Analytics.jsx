import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/analytics.css';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('likes'); // 'likes', 'saves', 'comments'
  const [hoveredBarId, setHoveredBarId] = useState(null);

  const fetchAnalytics = () => {
    setLoading(true);
    setError(null);
    axios.get('http://localhost:3000/api/food-partner/dashboard/analytics', { withCredentials: true })
      .then(response => {
        setStats(response.data.stats);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching analytics data:", err);
        setError(err.response?.data?.message || "Failed to load analytics dashboard.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-loading">
          <svg width="38" height="38" viewBox="0 0 38 38" stroke="var(--color-accent)">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="3">
                <circle strokeOpacity=".25" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
          <p>Analyzing kitchen statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-page">
        <div className="analytics-loading">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-danger, #ef4444)" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p>{error}</p>
          <button className="analytics-refresh-btn" onClick={fetchAnalytics}>Try Again</button>
        </div>
      </div>
    );
  }

  const { totalMeals, totalLikes, totalSaves, totalComments, customersServed, topDish, dishPerformance = [] } = stats;

  // Calculate highest count value for rendering dynamic vertical chart columns heights
  const maxVal = Math.max(...dishPerformance.map(d => d[activeTab] || 0), 1);

  return (
    <main className="analytics-page">
      <header className="analytics-header">
        <div>
          <h1 className="analytics-title">Dashboard</h1>
          <p className="analytics-subtitle">Monitor your reels reach, engagement, and kitchen audience</p>
        </div>
        <button className="analytics-refresh-btn" onClick={fetchAnalytics} aria-label="Refresh stats">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          Refresh
        </button>
      </header>

      {/* Metrics Cards Grid */}
      <section className="metrics-grid" aria-label="Performance metrics">
        <div className="metric-card metric-card-accent">
          <div className="metric-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <span className="metric-label">total reels</span>
          <span className="metric-value">{totalMeals}</span>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <span className="metric-label">total likes</span>
          <span className="metric-value">{totalLikes}</span>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="metric-label">bookmarks</span>
          <span className="metric-value">{totalSaves}</span>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
            </svg>
          </div>
          <span className="metric-label">comments</span>
          <span className="metric-value">{totalComments}</span>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="metric-label">customers served</span>
          <span className="metric-value">{customersServed}</span>
        </div>
      </section>

      {/* Top Performing Dish Banner */}
      {topDish && (
        <section className="highlight-banner" aria-label="Highlight banner">
          <div className="highlight-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          </div>
          <div className="highlight-text">
            <span className="highlight-title">🏆 Top Performing Recipe:</span> Your dish <strong style={{ color: 'var(--color-accent)' }}>{topDish.name}</strong> has the highest engagement with <strong>{topDish.likes} likes</strong>! Keep sharing preparation videos to attract more customers.
          </div>
        </section>
      )}

      {/* Custom Flex Comparison Chart */}
      <section className="analytics-section">
        <header className="section-header">
          <h2 className="section-title">Dish Performance Chart</h2>
          <div className="chart-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'likes'}
              className={`chart-tab-btn ${activeTab === 'likes' ? 'active' : ''}`}
              onClick={() => setActiveTab('likes')}
            >
              Likes
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'saves'}
              className={`chart-tab-btn ${activeTab === 'saves' ? 'active' : ''}`}
              onClick={() => setActiveTab('saves')}
            >
              Saves
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'comments'}
              className={`chart-tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
          </div>
        </header>

        {dishPerformance.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-6) 0', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            No food items uploaded yet. Go to Create Food to upload your first recipe reel!
          </div>
        ) : (
          <div className="custom-bar-chart">
            {dishPerformance.map((dish) => {
              const currentVal = dish[activeTab] || 0;
              const heightPercent = Math.min(100, Math.round((currentVal / maxVal) * 100));

              return (
                <div key={dish._id} className="chart-column">
                  {hoveredBarId === dish._id && (
                    <div className="chart-tooltip">
                      {currentVal} {activeTab}
                    </div>
                  )}
                  <div className="chart-bar-outer">
                    <div
                      className="chart-bar-inner"
                      style={{ height: `${heightPercent}%` }}
                      onMouseEnter={() => setHoveredBarId(dish._id)}
                      onMouseLeave={() => setHoveredBarId(null)}
                    />
                  </div>
                  <span className="chart-column-label" title={dish.name}>{dish.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Detailed Dishes Stats Table */}
      <section className="analytics-section">
        <h2 className="section-title" style={{ marginBottom: 'var(--space-5)' }}>Reels Engagement Leaderboard</h2>
        {dishPerformance.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-5) 0', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Upload food items to see detailed metrics comparison.
          </div>
        ) : (
          <div className="stats-table-wrapper">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Dish Name</th>
                  <th style={{ textAlign: 'center' }}>Likes</th>
                  <th style={{ textAlign: 'center' }}>Saves</th>
                  <th style={{ textAlign: 'center' }}>Comments</th>
                  <th style={{ textAlign: 'center' }}>Total Score</th>
                </tr>
              </thead>
              <tbody>
                {dishPerformance
                  .sort((a, b) => (b.likes + b.saves + b.comments) - (a.likes + a.saves + a.comments))
                  .map((dish) => (
                    <tr key={dish._id}>
                      <td className="table-dish-name">{dish.name}</td>
                      <td style={{ textAlign: 'center' }}>{dish.likes}</td>
                      <td style={{ textAlign: 'center' }}>{dish.saves}</td>
                      <td style={{ textAlign: 'center' }}>{dish.comments}</td>
                      <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--color-accent)' }}>
                        {dish.likes + dish.saves + dish.comments}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default Analytics;
