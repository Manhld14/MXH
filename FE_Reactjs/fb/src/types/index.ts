// src/types/index.ts
// ──────────────────────────────────────────────────────────
// Shared TypeScript interfaces / types — khớp với BE DTOs
// ──────────────────────────────────────────────────────────

// ─── User ───────────────────────────────────────────────
export interface User {
  userId: number;
  fullName: string;
  avatarUrl: string;
}

export interface AuthUser {
  userId: number;
  email: string;
  fullName: string;
  avatarUrl: string;
  birthday?: string;
  sex?: string;
  createdAt?: string;
}

// ─── Post Image ─────────────────────────────────────────
export interface PostImage {
  imageId: number;
  imageUrl: string;
}

// ─── Comment ─────────────────────────────────────────────
export interface Comment {
  commentId: number;
  user: User;
  content: string;
  createdAt: string;
}

// ─── Post ────────────────────────────────────────────────
export interface Post {
  postId: number;
  user: User;
  content: string;
  images: PostImage[];
  createdAt: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  comments: Comment[];
}

// ─── Pagination response ─────────────────────────────────
export interface PaginatedResponse<T> {
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
  items: T[];
}

// ─── Stories (vẫn giữ mock vì BE chưa có) ────────────────
export interface Story {
  id: string;
  user: { id: string; name: string; avatarUrl: string };
  imageUrl: string;
}

// ─── Misc UI types ────────────────────────────────────────
export interface Ad {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sponsor: string;
}

export interface Contact {
  id: string;
  user: User;
  isOnline: boolean;
}
