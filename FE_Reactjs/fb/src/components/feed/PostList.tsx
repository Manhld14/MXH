// src/components/feed/PostList.tsx
import { PostCard } from './PostCard';
import type { Post, Comment } from '../../types';

const PostSkeleton = () => (
  <div className="bg-gray-900 rounded-lg border border-gray-700 shadow p-4 animate-pulse">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-full bg-gray-800" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-800 rounded w-1/3" />
        <div className="h-2 bg-gray-800 rounded w-1/4" />
      </div>
    </div>
    <div className="space-y-2 mb-3">
      <div className="h-3 bg-gray-800 rounded w-full" />
      <div className="h-3 bg-gray-800 rounded w-4/5" />
    </div>
    <div className="h-52 bg-gray-800 rounded-lg mb-3" />
    <div className="flex gap-2">
      <div className="flex-1 h-8 bg-gray-800 rounded-lg" />
      <div className="flex-1 h-8 bg-gray-800 rounded-lg" />
    </div>
  </div>
);

interface PostListProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  onEditPost: (postId: number, payload: { content: string }) => Promise<void>;
  onDeletePost: (postId: number) => Promise<void>;
  onAddComment: (postId: number, content: string) => Promise<Comment>;
  onDeleteComment: (postId: number, commentId: number) => Promise<void>;
  onRefetch?: () => void;
}

export function PostList({
  posts,
  loading,
  error,
  onEditPost,
  onDeletePost,
  onAddComment,
  onDeleteComment,
  onRefetch,
}: PostListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-lg border border-gray-700 shadow p-6 text-center">
        <p className="text-gray-400 text-sm mb-3">{error}</p>
        {onRefetch && (
          <button
            onClick={onRefetch}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Thử lại
          </button>
        )}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg border border-gray-700 shadow p-6 text-center">
        <p className="text-gray-400 text-sm">Chưa có bài viết nào. Hãy đăng bài đi!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard
          key={post.postId}
          post={post}
          onEdit={(payload) => onEditPost(post.postId, payload)}
          onDelete={() => onDeletePost(post.postId)}
          onAddComment={(content) => onAddComment(post.postId, content)}
          onDeleteComment={(commentId) => onDeleteComment(post.postId, commentId)}
        />
      ))}
    </div>
  );
}
