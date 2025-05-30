import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth, db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthStore } from '@/store/auth.store';
import type { ReactNode } from 'react';
import type { UserInfo } from '@/types/response.type';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setCurrentUser, setUserInfo, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, 'users', user.uid));
          if (docSnap.exists()) {
            setUserInfo(docSnap.data() as UserInfo);
          }
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
