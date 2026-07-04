import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CommentsDrawer from './CommentsDrawer'

// Reusable feed for vertical reels
// Props:
// - items: Array of video items { _id, video, description, likeCount, savesCount, commentsCount, comments, foodPartner }
// - onLike: (item) => void | Promise<void>
// - onSave: (item) => void | Promise<void>
// - emptyMessage: string
const ReelItem = ({ item, setVideoRef, onLike, onSave, onCommentClick }) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [indicatorType, setIndicatorType] = useState('play'); // 'play' or 'pause'
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIndicatorType('play');
    } else {
      videoRef.current.pause();
      setIndicatorType('pause');
    }
    setShowIndicator(true);
    // Hide indicator after animation ends (500ms)
    const timer = setTimeout(() => {
      setShowIndicator(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  return (
    <section className="reel" role="listitem">
      <video
        ref={(el) => {
          videoRef.current = el;
          setVideoRef(item._id)(el);
        }}
        className="reel-video"
        src={item.video}
        muted
        playsInline
        loop
        autoPlay
        onClick={handleVideoClick}
        preload="auto"
        style={{ cursor: 'pointer' }}
      />

      {showIndicator && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '50%',
          width: '72px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 5,
          color: '#fff',
          animation: 'flash-scale 0.5s ease-out forwards'
        }}>
          {indicatorType === 'play' ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          )}
        </div>
      )}

      <div className="reel-overlay">
        <div className="reel-overlay-gradient" aria-hidden="true" />
        <div className="reel-actions">
          <div className="reel-action-group">
            <button
              onClick={onLike ? () => onLike(item) : undefined}
              className="reel-action"
              aria-label="Like"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </button>
            <div className="reel-action__count">{item.likeCount ?? item.likesCount ?? item.likes ?? 0}</div>
          </div>

          <div className="reel-action-group">
            <button
              className="reel-action"
              onClick={onSave ? () => onSave(item) : undefined}
              aria-label="Bookmark"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
              </svg>
            </button>
            <div className="reel-action__count">{item.savesCount ?? item.bookmarks ?? item.saves ?? 0}</div>
          </div>

          <div className="reel-action-group">
            <button 
              className="reel-action" 
              onClick={() => onCommentClick(item._id)}
              aria-label="Comments"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
              </svg>
            </button>
            <div className="reel-action__count">{item.commentsCount ?? 0}</div>
          </div>
        </div>

        <div className="reel-content">
          <p className="reel-description" title={item.description}>{item.description}</p>
          {item.foodPartner && (
            <Link className="reel-btn" to={"/food-partner/" + item.foodPartner} aria-label="Visit store">Visit store</Link>
          )}
        </div>
      </div>
    </section>
  );
};

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map())
  const [localItems, setLocalItems] = useState(items)
  const [activeCommentFoodId, setActiveCommentFoodId] = useState(null)

  useEffect(() => {
    setLocalItems(items)
  }, [items])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.1, 0.5, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [localItems])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }

  const handleCommentsCountChange = (foodId, diff) => {
    setLocalItems(prev => prev.map(item => {
      if (item._id === foodId) {
        const currentCount = item.commentsCount ?? 0;
        return { ...item, commentsCount: Math.max(0, currentCount + diff) };
      }
      return item;
    }));
  };

  return (
    <div className="reels-page">
      <div className="reels-feed" role="list">
        {localItems.length === 0 && (
          <div className="empty-state">
            <p>{emptyMessage}</p>
          </div>
        )}

        {localItems.map((item) => (
          <ReelItem
            key={item._id}
            item={item}
            setVideoRef={setVideoRef}
            onLike={onLike}
            onSave={onSave}
            onCommentClick={(id) => setActiveCommentFoodId(id)}
          />
        ))}
      </div>

      {activeCommentFoodId && (
        <CommentsDrawer
          foodId={activeCommentFoodId}
          onClose={() => setActiveCommentFoodId(null)}
          onCommentsCountChange={(diff) => handleCommentsCountChange(activeCommentFoodId, diff)}
        />
      )}
    </div>
  )
}

export default ReelFeed