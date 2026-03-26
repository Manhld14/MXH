// src/redux/slices/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '../../types';

const STORAGE_KEY = 'fb_current_user';

function loadFromStorage(): AuthUser | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  } catch {
    return null;
  }
}

interface AuthState {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  currentUser: loadFromStorage(),
  isAuthenticated: !!loadFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
