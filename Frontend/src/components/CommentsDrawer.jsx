import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';
import '../styles/comments-drawer.css';

const formatTimeAgo = (dateString) => {
  if (!dateString) return 'just now';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const CommentsDrawer = ({ foodId, onClose, onCommentsCountChange }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    axios.get(`${API_BASE_URL}/api/comments/${foodId}`, { withCredentials: true })
      .then(response => {
        if (active) {
          setComments(response.data.comments || []);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Error fetching comments:", err);
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [foodId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/comments/${foodId}`,
        { text: newComment },
        { withCredentials: true }
      );
      
      const commentWithUser = response.data.comment;
      setComments(prev => [commentWithUser, ...prev]);
      setNewComment('');
      
      // Notify parent to increment commentsCount
      if (onCommentsCountChange) onCommentsCountChange(1);

      // Scroll comments list to top
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert(err.response?.data?.message || "Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/comments/${commentId}`, { withCredentials: true });
      setComments(prev => prev.filter(c => c._id !== commentId));
      
      // Notify parent to decrement commentsCount
      if (onCommentsCountChange) onCommentsCountChange(-1);
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert(err.response?.data?.message || "Failed to delete comment.");
    }
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <>
      {/* Background click-through overlay to close */}
      <div className="comments-drawer-overlay" onClick={onClose} />

      <div className="comments-drawer">
        <div className="drawer-handle" onClick={onClose} />
        
        <div className="drawer-header">
          <h2 className="drawer-title">Comments ({comments.length})</h2>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close comments">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="comments-list" ref={listRef} role="log" aria-label="Comments feed">
          {loading ? (
            <div className="comments-empty">
              <span style={{ fontSize: '0.9rem' }}>Loading comments...</span>
            </div>
          ) : comments.length === 0 ? (
            <div className="comments-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
              </svg>
              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>No comments yet</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Be the first to share your thoughts!</span>
            </div>
          ) : (
            comments.map((comment) => {
              const isCommentAuthor = user && comment.user && (user._id === comment.user._id || user._id === comment.user);
              const authorName = comment.user?.name || 'Anonymous User';
              
              return (
                <div key={comment._id} className="comment-item">
                  <div className="comment-avatar" aria-hidden="true">
                    {getUserInitials(authorName)}
                  </div>
                  <div className="comment-body">
                    <div className="comment-meta">
                      <span className="comment-author">{authorName}</span>
                      <span className="comment-time">{formatTimeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                  {isCommentAuthor && (
                    <button 
                      className="comment-delete-btn" 
                      onClick={() => handleDelete(comment._id)}
                      aria-label="Delete comment"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="drawer-footer">
          <form className="comment-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="comment-input"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submitting}
              maxLength="500"
            />
            <button 
              type="submit" 
              className="comment-submit-btn" 
              disabled={submitting || !newComment.trim()}
              aria-label="Post comment"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentsDrawer;
