import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '@/config/firebase';
import { useAuthStore } from '@/store/auth.store';
import type { ReactNode } from 'react';
import { fetchUserData } from '@/service/auth/auth.service';
import type { UserInfo } from '@/types/response.type';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setCurrentUser, setUserInfo, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userInfo: UserInfo = await fetchUserData(user.uid);
          setUserInfo(userInfo);
        } catch (err) {
          console.error('Lỗi lấy thông tin user:', err);
        }
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return <>{children}</>;
};
