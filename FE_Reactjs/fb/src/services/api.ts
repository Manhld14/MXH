// src/services/api.ts
// ──────────────────────────────────────────────────────────────────────────────
// API Service layer — kết nối tới Backend ASP.NET Core
// BE URL: https://localhost:7130
// ──────────────────────────────────────────────────────────────────────────────

import axios from 'axios';
import type { Post, Comment, PaginatedResponse, AuthUser, Story } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://localhost:7130';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ─── MOCK Stories (BE chưa có endpoint này) ────────────────────────────────
const MOCK_STORIES: Story[] = [
  { id: 's1', user: { id: 'u1', name: 'Văn An', avatarUrl: 'https://i.pravatar.cc/150?img=1' }, imageUrl: 'https://picsum.photos/seed/story1/200/350' },
  { id: 's2', user: { id: 'u2', name: 'Thị Bích', avatarUrl: 'https://i.pravatar.cc/150?img=5' }, imageUrl: 'https://picsum.photos/seed/story2/200/350' },
  { id: 's3', user: { id: 'u3', name: 'Minh Khoa', avatarUrl: 'https://i.pravatar.cc/150?img=8' }, imageUrl: 'https://picsum.photos/seed/story3/200/350' },
  { id: 's4', user: { id: 'u4', name: 'Thu Hương', avatarUrl: 'https://i.pravatar.cc/150?img=9' }, imageUrl: 'https://picsum.photos/seed/story4/200/350' },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Trả về URL đầy đủ cho ảnh từ BE (relative → absolute) */
export function resolveImageUrl(path: string | null | undefined): string {
  if (!path) return 'https://i.pravatar.cc/150?img=3';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path}`;
}

// ─── AUTH ────────────────────────────────────────────────────────────────────

/**
 * Đăng nhập: POST /api/Users/login
 */
export async function login(email: string, password: string): Promise<AuthUser> {
  const res = await api.post('/api/Users/login', { email, passwordHash: password });
  // BE trả về: { message, user: { userId, email, fullName, avatarUrl, birthday, sex, createdAt } }
  return res.data.user as AuthUser;
}

/**
 * Đăng ký user mới: POST /api/Users
 */
export async function register(payload: {
  fullName: string;
  email: string;
  passwordHash: string;
}): Promise<AuthUser> {
  const res = await api.post('/api/Users', payload);
  return res.data as AuthUser;
}

/**
 * Lấy thông tin user: GET /api/Users/{id}
 */
export async function getUser(id: number): Promise<AuthUser> {
  const res = await api.get(`/api/Users/${id}`);
  return res.data as AuthUser;
}

/**
 * Cập nhật profile: PUT /api/Users/update-profile/{id}
 */
export async function updateProfile(id: number, payload: {
  fullName: string;
  email: string;
  birthday?: string;
  sex?: string;
  avatar?: File;
}): Promise<AuthUser> {
  const form = new FormData();
  form.append('fullName', payload.fullName);
  form.append('email', payload.email);
  if (payload.birthday) form.append('birthday', payload.birthday);
  if (payload.sex) form.append('sex', payload.sex);
  if (payload.avatar) form.append('avatar', payload.avatar);

  const res = await api.put(`/api/Users/update-profile/${id}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data as AuthUser;
}

// ─── POSTS ───────────────────────────────────────────────────────────────────

/**
 * Lấy danh sách bài viết (phân trang): GET /api/Posts
 */
export async function fetchPosts(
  page = 1,
  pageSize = 10,
  currentUserId?: number
): Promise<Post[]> {
  const params: Record<string, string | number> = { page, pageSize };
  if (currentUserId !== undefined) params.currentUserId = currentUserId;

  const res = await api.get<PaginatedResponse<Post>>('/api/Posts', { params });
  return res.data.items;
}

/**
 * Lấy bài viết theo user: GET /api/Posts/user/{userId}
 */
export async function fetchPostsByUser(userId: number): Promise<Post[]> {
  const res = await api.get<Post[]>(`/api/Posts/user/${userId}`);
  return res.data;
}

/**
 * Tạo bài viết mới: POST /api/Posts/create  (multipart/form-data)
 */
export async function createPost(payload: {
  userId: number;
  content: string;
  images?: File[];
}): Promise<Post> {
  const form = new FormData();
  form.append('userId', payload.userId.toString());
  form.append('content', payload.content);
  if (payload.images) {
    payload.images.forEach((file) => form.append('images', file));
  }

  const res = await api.post('/api/Posts/create', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  // BE trả về PostResponseDto — map sang Post interface
  const data = res.data;
  const newPost: Post = {
    postId: data.postId,
    user: {
      userId: data.userId,
      fullName: data.authorName,
      avatarUrl: resolveImageUrl(data.avatarUrl),
    },
    content: data.content,
    createdAt: data.createdAt,
    images: (data.images as string[]).map((url: string, idx: number) => ({
      imageId: idx,
      imageUrl: resolveImageUrl(url),
    })),
    likeCount: 0,
    commentCount: 0,
    isLiked: false,
    comments: [],
  };
  return newPost;
}

/**
 * Cập nhật bài viết: PUT /api/Posts/{id}
 */
export async function updatePost(postId: number, payload: { content: string }): Promise<Post> {
  const res = await api.put(`/api/Posts/${postId}`, { postId, content: payload.content });
  // BE trả về { message, post: PostDTO }
  return res.data.post as Post;
}

/**
 * Xóa bài viết: DELETE /api/Posts/{id}
 */
export async function deletePost(postId: number): Promise<void> {
  await api.delete(`/api/Posts/${postId}`);
}

// ─── COMMENTS ────────────────────────────────────────────────────────────────

/**
 * Thêm bình luận: POST /api/Posts/comment
 */
export async function addComment(
  postId: number,
  userId: number,
  content: string
): Promise<Comment> {
  const res = await api.post('/api/Posts/comment', { postId, userId, content });
  return res.data as Comment;
}

// ─── STORIES (mock) ──────────────────────────────────────────────────────────

export async function fetchStories(): Promise<Story[]> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_STORIES;
}

export default api;
