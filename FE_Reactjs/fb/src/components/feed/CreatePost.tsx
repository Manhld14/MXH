// src/components/feed/CreatePost.tsx
import React, { useState } from 'react';
import { createPost } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface CreatePostProps {
  onPostCreated?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() || !currentUser) return;
    try {
      setSubmitting(true);
      await createPost({ userId: currentUser.userId, content: content.trim() });
      setContent('');
      onPostCreated?.();
    } catch {
      alert('Không thể đăng bài. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#242526] rounded-xl shadow p-3">
      {/* Top row */}
      <div className="flex items-center gap-2 mb-3">
        <img
          src={`https://localhost:7130${currentUser?.avatarUrl}`}
          alt="My avatar"
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <button
          onClick={() => {}}
          className="flex-1 bg-[#3a3b3c] hover:bg-[#4e4f50] rounded-full px-4 py-2.5 text-left text-[#b0b3b8] text-sm transition-colors"
          // Using a button for accessibility; in real FB it opens a modal
        >
          {content || 'Bạn đang nghĩ gì, Dev?'}
        </button>
      </div>

      {/* Quick compose input (shown below) */}
      <div className="mb-3">
        <textarea
          placeholder="Chia sẻ suy nghĩ của bạn..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={content ? 3 : 0}
          className={`w-full bg-transparent text-[#e4e6eb] placeholder-[#b0b3b8] text-sm resize-none outline-none transition-all ${content ? 'h-auto' : 'h-0 overflow-hidden'}`}
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-[#3e4042] mb-3" />

      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {/* Live Video */}
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#3a3b3c] transition-colors">
            <svg viewBox="0 0 24 24" fill="#f02849" className="w-5 h-5">
              <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
            </svg>
            <span className="text-[#e4e6eb] text-sm font-medium hidden sm:inline">Video trực tiếp</span>
          </button>
          {/* Photo/Video */}
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#3a3b3c] transition-colors">
            <svg viewBox="0 0 24 24" fill="#45bd62" className="w-5 h-5">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
            <span className="text-[#e4e6eb] text-sm font-medium hidden sm:inline">Ảnh/Video</span>
          </button>
          {/* Feeling */}
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#3a3b3c] transition-colors">
            <svg viewBox="0 0 24 24" fill="#f7b928" className="w-5 h-5">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
            <span className="text-[#e4e6eb] text-sm font-medium hidden sm:inline">Cảm xúc</span>
          </button>
        </div>

        {/* Submit button (visible when there's content) */}
        {content.trim() && (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-1.5 bg-[#1877f2] hover:bg-[#166fe5] disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {submitting ? 'Đang đăng...' : 'Đăng'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
