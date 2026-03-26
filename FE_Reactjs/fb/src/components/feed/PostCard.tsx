// src/components/feed/PostCard.tsx
import { useState } from 'react';
import type { Post, Comment } from '../../types';
import { CommentsSection } from './CommentsSection';
import { useAuth } from '../../context/AuthContext';

interface PostComponentProps {
  post: Post;
  onEdit: (payload: { content: string }) => Promise<void>;
  onDelete: () => Promise<void>;
  onAddComment: (content: string) => Promise<Comment>;
  onDeleteComment: (commentId: number) => Promise<void>;
  isLoading?: boolean;
}

export function PostCard({
  post,
  onEdit,
  onDelete,
  onAddComment,
  onDeleteComment,
  isLoading = false,
}: PostComponentProps) {
  const { currentUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  const isOwner = currentUser?.userId === post.user.userId;

  const handleEdit = async () => {
    if (!editContent.trim()) return;
    setIsSubmitting(true);
    try {
      await onEdit({ content: editContent.trim() });
      setShowEditModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await onDelete();
      setShowDeleteConfirm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
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
    <>
      <div className="mb-4 rounded-lg border border-gray-700 bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={`https://localhost:7130${post.user.avatarUrl}`}
              alt={post.user.fullName}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-white">{post.user.fullName}</h3>
              <time className="text-sm text-gray-500">{formatTime(post.createdAt)}</time>
            </div>
          </div>

          {/* Menu button — chỉ hiện với owner */}
          {isOwner && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                disabled={isLoading}
                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-800 disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H9.5V3.5H10.5V1.5ZM10.5 8.5H9.5V10.5H10.5V8.5ZM10.5 15.5H9.5V17.5H10.5V15.5Z" />
                </svg>
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-700 bg-gray-800 shadow-lg z-10">
                  <button
                    onClick={() => { setShowEditModal(true); setShowMenu(false); setEditContent(post.content); }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-300 transition hover:bg-gray-700"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Chỉnh sửa bài viết
                  </button>
                  <button
                    onClick={() => { setShowDeleteConfirm(true); setShowMenu(false); }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-400 transition hover:bg-gray-700"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Xóa bài viết
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 pb-4">
          <p className="text-white whitespace-pre-wrap break-words">{post.content}</p>
        </div>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className={`grid gap-1 px-6 pb-4 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.images.map((img) => (
              <img
                key={img.imageId}
                src={`https://localhost:7130${img.imageUrl}`}
                alt="Post image"
                className="w-full rounded-lg object-cover max-h-80"
              />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between border-t border-b border-gray-700 px-6 py-3 text-sm text-gray-500">
          <span>👍 {likeCount} lượt thích</span>
          <span>💬 {post.commentCount} bình luận</span>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 px-4 py-3">
          <button
            onClick={toggleLike}
            className={`flex items-center justify-center gap-2 rounded py-2 transition hover:bg-gray-800 font-semibold ${isLiked ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <svg className="h-5 w-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Thích
          </button>
          <button className="flex items-center justify-center gap-2 rounded py-2 text-gray-400 transition hover:bg-gray-800">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Bình luận
          </button>
        </div>

        {/* Comments */}
        <CommentsSection
          comments={post.comments ?? []}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
          isLoading={isLoading}
        />
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-gray-900 border border-gray-700 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Chỉnh sửa bài viết</h3>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={4}
              className="w-full rounded-xl bg-gray-800 border border-gray-600 text-white px-4 py-3 text-sm resize-none focus:outline-none focus:border-blue-500 transition"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 rounded-xl bg-gray-700 px-4 py-2.5 font-semibold text-white hover:bg-gray-600 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleEdit}
                disabled={isSubmitting || !editContent.trim()}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-500 disabled:opacity-50 transition"
              >
                {isSubmitting ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-gray-900 border border-gray-700 p-6">
            <h3 className="text-lg font-bold text-white mb-2">Xóa bài viết?</h3>
            <p className="text-gray-300 mb-6 text-sm">
              Bạn có chắc muốn xóa bài viết này? Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-gray-700 px-4 py-2.5 font-semibold text-white hover:bg-gray-600 disabled:opacity-50 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition"
              >
                {isSubmitting ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
