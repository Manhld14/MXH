// src/hooks/usePosts.ts
import { useState, useEffect, useCallback } from 'react';
import type { Post, Comment } from '../types';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  addComment,
  resolveImageUrl,
} from '../services/api';
import { useAuth } from '../context/AuthContext';

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createNewPost: (payload: { content: string; images?: File[] }) => Promise<Post>;
  editPost: (postId: number, payload: { content: string }) => Promise<void>;
  removePost: (postId: number) => Promise<void>;
  addPostComment: (postId: number, content: string) => Promise<Comment>;
  removeComment: (postId: number, commentId: number) => Promise<void>;
}

export function usePosts(): UsePostsReturn {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPosts(1, 20, currentUser?.userId);
      // Resolve image URLs từ BE (relative → absolute)
      // Giữ nguyên URL relative cho user/comment để khớp với hardcode ở FE component
      const resolved = data.map((p) => ({
        ...p,
        images: p.images?.map((img) => ({ ...img, imageUrl: resolveImageUrl(img.imageUrl) })) ?? [],
      }));
      setPosts(resolved);
    } catch (err) {
      setError('Không thể tải bài viết. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.userId]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // ─── POST CRUD ───────────────────────────────────────────────────────────

  const createNewPost = useCallback(
    async (payload: { content: string; images?: File[] }): Promise<Post> => {
      if (!currentUser) throw new Error('Chưa đăng nhập');

      const tempPost: Post = {
        postId: -Date.now(),
        user: {
          userId: currentUser.userId,
          fullName: currentUser.fullName,
          avatarUrl: currentUser.avatarUrl,
        },
        content: payload.content,
        images: [],
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
        isLiked: false,
        comments: [],
      };

      setPosts((prev) => [tempPost, ...prev]);

      try {
        const newPost = await createPost({
          userId: currentUser.userId,
          content: payload.content,
          images: payload.images,
        });
        setPosts((prev) => prev.map((p) => (p.postId === tempPost.postId ? newPost : p)));
        return newPost;
      } catch (err) {
        setError('Không thể tạo bài viết.');
        setPosts((prev) => prev.filter((p) => p.postId !== tempPost.postId));
        throw err;
      }
    },
    [currentUser]
  );

  const editPost = useCallback(
    async (postId: number, payload: { content: string }): Promise<void> => {
      // Optimistic update
      setPosts((prev) =>
        prev.map((p) => (p.postId === postId ? { ...p, content: payload.content } : p))
      );
      try {
        const updated = await updatePost(postId, payload);
        // Merge lại dữ liệu từ server
        setPosts((prev) =>
          prev.map((p) =>
            p.postId === postId
              ? {
                  ...p,
                  content: updated.content ?? payload.content,
                  images: updated.images?.map((img) => ({
                    ...img,
                    imageUrl: resolveImageUrl(img.imageUrl),
                  })) ?? p.images,
                }
              : p
          )
        );
      } catch (err) {
        setError('Không thể cập nhật bài viết.');
        await loadPosts();
        throw err;
      }
    },
    [loadPosts]
  );

  const removePost = useCallback(
    async (postId: number): Promise<void> => {
      setPosts((prev) => prev.filter((p) => p.postId !== postId));
      try {
        await deletePost(postId);
      } catch (err) {
        setError('Không thể xóa bài viết.');
        await loadPosts();
        throw err;
      }
    },
    [loadPosts]
  );

  // ─── COMMENT ────────────────────────────────────────────────────────────

  const addPostComment = useCallback(
    async (postId: number, content: string): Promise<Comment> => {
      if (!currentUser) throw new Error('Chưa đăng nhập');

      const tempComment: Comment = {
        commentId: -Date.now(),
        user: {
          userId: currentUser.userId,
          fullName: currentUser.fullName,
          avatarUrl: currentUser.avatarUrl,
        },
        content,
        createdAt: new Date().toISOString(),
      };

      setPosts((prev) =>
        prev.map((p) =>
          p.postId === postId
            ? { ...p, comments: [...(p.comments ?? []), tempComment], commentCount: p.commentCount + 1 }
            : p
        )
      );

      try {
        const resolved = await addComment(postId, currentUser.userId, content);
        setPosts((prev) =>
          prev.map((p) =>
            p.postId === postId
              ? {
                  ...p,
                  comments: p.comments.map((c) =>
                    c.commentId === tempComment.commentId ? resolved : c
                  ),
                }
              : p
          )
        );
        return resolved;
      } catch (err) {
        setError('Không thể thêm bình luận.');
        setPosts((prev) =>
          prev.map((p) =>
            p.postId === postId
              ? {
                  ...p,
                  comments: p.comments.filter((c) => c.commentId !== tempComment.commentId),
                  commentCount: p.commentCount - 1,
                }
              : p
          )
        );
        throw err;
      }
    },
    [currentUser]
  );

  const removeComment = useCallback(
    async (postId: number, commentId: number): Promise<void> => {
      setPosts((prev) =>
        prev.map((p) =>
          p.postId === postId
            ? {
                ...p,
                comments: p.comments.filter((c) => c.commentId !== commentId),
                commentCount: p.commentCount - 1,
              }
            : p
        )
      );
    },
    []
  );

  return {
    posts,
    loading,
    error,
    refetch: loadPosts,
    createNewPost,
    editPost,
    removePost,
    addPostComment,
    removeComment,
  };
}
