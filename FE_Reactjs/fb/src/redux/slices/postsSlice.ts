// src/redux/slices/postsSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Post, Comment } from '../../types';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  addComment,
  resolveImageUrl,
} from '../../services/api';

// ─── State ────────────────────────────────────────────────────────────────────

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const fetchPostsThunk = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number | undefined, { signal }) => {
    const data = await fetchPosts(1, 20, userId, signal);
    // Resolve relative image URLs từ backend → absolute
    return data.map((p) => ({
      ...p,
      images: p.images?.map((img) => ({ ...img, imageUrl: resolveImageUrl(img.imageUrl) })) ?? [],
    }));
  }
);

export const createPostThunk = createAsyncThunk(
  'posts/createPost',
  async (
    payload: { userId: number; content: string; images?: File[]; tempId: number },
    { rejectWithValue }
  ) => {
    try {
      const newPost = await createPost({
        userId: payload.userId,
        content: payload.content,
        images: payload.images,
      });
      return { tempId: payload.tempId, newPost };
    } catch {
      return rejectWithValue(payload.tempId);
    }
  }
);

export const updatePostThunk = createAsyncThunk(
  'posts/updatePost',
  async (payload: { postId: number; content: string }, { rejectWithValue }) => {
    try {
      const updated = await updatePost(payload.postId, { content: payload.content });
      return {
        postId: payload.postId,
        content: updated.content ?? payload.content,
        images: updated.images?.map((img) => ({
          ...img,
          imageUrl: resolveImageUrl(img.imageUrl),
        })),
      };
    } catch {
      return rejectWithValue(payload.postId);
    }
  }
);

export const deletePostThunk = createAsyncThunk(
  'posts/deletePost',
  async (postId: number, { rejectWithValue }) => {
    try {
      await deletePost(postId);
      return postId;
    } catch {
      return rejectWithValue(postId);
    }
  }
);

export const addCommentThunk = createAsyncThunk(
  'posts/addComment',
  async (
    payload: { postId: number; userId: number; content: string; tempCommentId: number },
    { rejectWithValue }
  ) => {
    try {
      const resolved = await addComment(payload.postId, payload.userId, payload.content);
      return { postId: payload.postId, tempCommentId: payload.tempCommentId, comment: resolved };
    } catch {
      return rejectWithValue({ postId: payload.postId, tempCommentId: payload.tempCommentId });
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Optimistic add temp post
    addTempPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
    },
    // Optimistic remove post (for delete)
    removeTempPost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((p) => p.postId !== action.payload);
    },
    // Optimistic update content
    optimisticUpdatePost(state, action: PayloadAction<{ postId: number; content: string }>) {
      const post = state.posts.find((p) => p.postId === action.payload.postId);
      if (post) post.content = action.payload.content;
    },
    // Restore posts after failed delete
    restorePost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
    },
    // Optimistic add comment
    addTempComment(
      state,
      action: PayloadAction<{ postId: number; comment: Comment }>
    ) {
      const post = state.posts.find((p) => p.postId === action.payload.postId);
      if (post) {
        post.comments = [...(post.comments ?? []), action.payload.comment];
        post.commentCount += 1;
      }
    },
    // Remove temp comment on failure
    removeTempComment(
      state,
      action: PayloadAction<{ postId: number; tempCommentId: number }>
    ) {
      const post = state.posts.find((p) => p.postId === action.payload.postId);
      if (post) {
        post.comments = post.comments.filter(
          (c) => c.commentId !== action.payload.tempCommentId
        );
        post.commentCount -= 1;
      }
    },
    // Remove a confirmed comment (by user action)
    removeComment(state, action: PayloadAction<{ postId: number; commentId: number }>) {
      const post = state.posts.find((p) => p.postId === action.payload.postId);
      if (post) {
        post.comments = post.comments.filter((c) => c.commentId !== action.payload.commentId);
        post.commentCount -= 1;
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── fetchPosts ──────────────────────────────────────────────────────────
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.loading = false;
        if (action.error.name !== 'AbortError') {
          state.error = 'Không thể tải bài viết. Vui lòng thử lại.';
        }
      });

    // ── createPost ──────────────────────────────────────────────────────────
    builder
      .addCase(createPostThunk.fulfilled, (state, action) => {
        const { tempId, newPost } = action.payload;
        const idx = state.posts.findIndex((p) => p.postId === tempId);
        if (idx !== -1) state.posts[idx] = newPost;
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.error = 'Không thể tạo bài viết.';
        // Remove temp post
        state.posts = state.posts.filter((p) => p.postId !== (action.payload as number));
      });

    // ── updatePost ──────────────────────────────────────────────────────────
    builder
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        const { postId, content, images } = action.payload;
        const post = state.posts.find((p) => p.postId === postId);
        if (post) {
          post.content = content;
          if (images) post.images = images;
        }
      })
      .addCase(updatePostThunk.rejected, (state) => {
        state.error = 'Không thể cập nhật bài viết.';
      });

    // ── deletePost ──────────────────────────────────────────────────────────
    builder.addCase(deletePostThunk.rejected, (state) => {
      state.error = 'Không thể xóa bài viết.';
    });

    // ── addComment ──────────────────────────────────────────────────────────
    builder
      .addCase(addCommentThunk.fulfilled, (state, action) => {
        const { postId, tempCommentId, comment } = action.payload;
        const post = state.posts.find((p) => p.postId === postId);
        if (post) {
          post.comments = post.comments.map((c) =>
            c.commentId === tempCommentId ? comment : c
          );
        }
      })
      .addCase(addCommentThunk.rejected, (state, action) => {
        state.error = 'Không thể thêm bình luận.';
        const payload = action.payload as { postId: number; tempCommentId: number };
        const post = state.posts.find((p) => p.postId === payload.postId);
        if (post) {
          post.comments = post.comments.filter((c) => c.commentId !== payload.tempCommentId);
          post.commentCount -= 1;
        }
      });
  },
});

export const {
  addTempPost,
  removeTempPost,
  optimisticUpdatePost,
  restorePost,
  addTempComment,
  removeTempComment,
  removeComment,
  clearError,
} = postsSlice.actions;

export default postsSlice.reducer;
