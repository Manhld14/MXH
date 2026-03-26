// src/components/feed/CommentsSection.tsx
import { useState, useRef } from 'react';
import type { Comment } from '../../types';
import { useAppSelector } from '../../redux/hooks';


interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => Promise<Comment>;
  onDeleteComment: (commentId: number) => Promise<void>;
  isLoading?: boolean;
}

export function CommentsSection({
  comments,
  onAddComment,
  onDeleteComment,
  isLoading = false,
}: CommentsSectionProps) {
  const currentUser = useAppSelector((s) => s.auth.currentUser);
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [showCommentMenu, setShowCommentMenu] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || isSubmittingComment || isLoading) return;
    setIsSubmittingComment(true);
    try {
      await onAddComment(newCommentText.trim());
      setNewCommentText('');
      inputRef.current?.focus();
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await onDeleteComment(commentId);
      setShowCommentMenu(null);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const diff = (Date.now() - d.getTime()) / 1000;
      if (diff < 60) return 'Vừa xong';
      if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
      return d.toLocaleDateString('vi-VN');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="border-t border-gray-700 bg-gray-950 px-6 py-4">
      {/* Add comment input */}
      <form onSubmit={handleAddComment} className="mb-4">
        <div className="flex items-end gap-3">
          <img
            src={`https://localhost:7130${currentUser?.avatarUrl}`}
            alt="Your avatar"
            className="h-8 w-8 rounded-full flex-shrink-0 object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2">
              <input
                ref={inputRef}
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Viết bình luận..."
                disabled={isSubmittingComment || isLoading}
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!newCommentText.trim() || isSubmittingComment || isLoading}
                className="text-gray-400 transition hover:text-blue-400 disabled:opacity-30"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-2.976 5.951 2.976a1 1 0 001.169-1.409l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-sm text-gray-500">Chưa có bình luận nào</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.commentId} className="flex gap-3">
              <img
                src={`https://localhost:7130${comment.user.avatarUrl}`}
                alt={comment.user.fullName}
                className="h-8 w-8 rounded-full flex-shrink-0 object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="rounded-lg bg-gray-800 px-3 py-2">
                      <p className="text-sm font-semibold text-white">{comment.user.fullName}</p>
                      <p className="text-sm text-gray-200">{comment.content}</p>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                      <span>{formatTime(comment.createdAt)}</span>
                      <button className="transition hover:text-blue-400">👍 Thích</button>
                    </div>
                  </div>

                  {/* Comment menu — chỉ show nếu là comment của currentUser */}
                  {currentUser && comment.user.userId === currentUser.userId && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowCommentMenu(showCommentMenu === comment.commentId ? null : comment.commentId)
                        }
                        disabled={isLoading}
                        className="rounded-full p-1 text-gray-500 transition hover:bg-gray-800 disabled:opacity-50"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.5 1.5H9.5V3.5H10.5V1.5ZM10.5 8.5H9.5V10.5H10.5V8.5ZM10.5 15.5H9.5V17.5H10.5V15.5Z" />
                        </svg>
                      </button>

                      {showCommentMenu === comment.commentId && (
                        <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-gray-700 bg-gray-800 shadow-lg z-10">
                          <button
                            onClick={() => handleDeleteComment(comment.commentId)}
                            disabled={isLoading}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-400 transition hover:bg-gray-700 disabled:opacity-50"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Xóa
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
