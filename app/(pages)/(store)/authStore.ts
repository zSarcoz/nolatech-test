"use client"

import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: { username: string; password: string } | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  currentUser: getCurrentUser(),
  login: (username: string, password: string) => {
    const user = { username, password };
    localStorage.setItem('currentUser', JSON.stringify(user));
    set({ isAuthenticated: true, currentUser: user });
  },
  logout: () => {
    localStorage.removeItem('currentUser');
    set({ isAuthenticated: false, currentUser: null });
  },
}));