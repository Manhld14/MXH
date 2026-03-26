// src/hooks/usePosts.ts
import { useEffect, useCallback } from 'react';
import type { Post, Comment } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchPostsThunk,
  createPostThunk,
  updatePostThunk,
  deletePostThunk,
  addCommentThunk,
  addTempPost,
  removeTempPost,
  optimisticUpdatePost,
  addTempComment,
  removeComment,
} from '../redux/slices/postsSlice';

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
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.auth.currentUser);
  const posts = useAppSelector((s) => s.posts.posts);
  const loading = useAppSelector((s) => s.posts.loading);
  const error = useAppSelector((s) => s.posts.error);

  const loadPosts = useCallback(() => {
    return dispatch(fetchPostsThunk(currentUser?.userId));
  }, [dispatch, currentUser?.userId]);

  useEffect(() => {
    const promise = loadPosts();
    return () => {
      promise.abort();
    };
  }, [loadPosts]);

  // ─── POST CRUD ───────────────────────────────────────────────────────────

  const createNewPost = useCallback(
    async (payload: { content: string; images?: File[] }): Promise<Post> => {
      if (!currentUser) throw new Error('Chưa đăng nhập');

      const tempId = -Date.now();
      const tempPost: Post = {
        postId: tempId,
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

      dispatch(addTempPost(tempPost));

      const result = await dispatch(
        createPostThunk({
          userId: currentUser.userId,
          content: payload.content,
          images: payload.images,
          tempId,
        })
      );

      if (createPostThunk.rejected.match(result)) {
        throw new Error('Không thể tạo bài viết.');
      }

      return (result.payload as { newPost: Post }).newPost;
    },
    [dispatch, currentUser]
  );

  const editPost = useCallback(
    async (postId: number, payload: { content: string }): Promise<void> => {
      // Optimistic update
      dispatch(optimisticUpdatePost({ postId, content: payload.content }));

      const result = await dispatch(updatePostThunk({ postId, content: payload.content }));
      if (updatePostThunk.rejected.match(result)) {
        // Revert: reload posts từ server
        loadPosts();
        throw new Error('Không thể cập nhật bài viết.');
      }
    },
    [dispatch, loadPosts]
  );

  const removePost = useCallback(
    async (postId: number): Promise<void> => {
      // Optimistic remove
      const postToRemove = posts.find((p) => p.postId === postId);
      dispatch(removeTempPost(postId));

      const result = await dispatch(deletePostThunk(postId));
      if (deletePostThunk.rejected.match(result)) {
        // Restore on failure
        if (postToRemove) loadPosts();
        throw new Error('Không thể xóa bài viết.');
      }
    },
    [dispatch, posts, loadPosts]
  );

  // ─── COMMENT ────────────────────────────────────────────────────────────

  const addPostComment = useCallback(
    async (postId: number, content: string): Promise<Comment> => {
      if (!currentUser) throw new Error('Chưa đăng nhập');

      const tempCommentId = -Date.now();
      const tempComment: Comment = {
        commentId: tempCommentId,
        user: {
          userId: currentUser.userId,
          fullName: currentUser.fullName,
          avatarUrl: currentUser.avatarUrl,
        },
        content,
        createdAt: new Date().toISOString(),
      };

      dispatch(addTempComment({ postId, comment: tempComment }));

      const result = await dispatch(
        addCommentThunk({
          postId,
          userId: currentUser.userId,
          content,
          tempCommentId,
        })
      );

      if (addCommentThunk.rejected.match(result)) {
        throw new Error('Không thể thêm bình luận.');
      }

      return (result.payload as { comment: Comment }).comment;
    },
    [dispatch, currentUser]
  );

  const removeCommentFn = useCallback(
    async (postId: number, commentId: number): Promise<void> => {
      dispatch(removeComment({ postId, commentId }));
    },
    [dispatch]
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
    removeComment: removeCommentFn,
  };
}
