import { create } from 'zustand';
import type { UserInfo } from '@/types/response.type';
import type { User } from 'firebase/auth';
import { persist } from 'zustand/middleware';

type AuthState = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),
      loading: true,
      setLoading: (value) => set({ loading: value }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
