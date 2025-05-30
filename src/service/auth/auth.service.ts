import { auth, db } from '@/config/firebase';
import type { LoginParams, RegisterParams } from '@/types/request.type';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

export const loginWithPassword = async (values: LoginParams) => {
  const { email, password } = values;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email || '', password || '');
    alert(`Đăng nhập thành công: ${userCredential.user.email}`);
  } catch (error) {
    alert('Lỗi đăng nhập: ' + error);
  }
};

export const register = async (values: RegisterParams, navigate: (path: string) => void) => {
  const { email, password, fullname, level } = values;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      email,
      fullname,
      level,
      createdAt: serverTimestamp(),
    });
    navigate('/login');
  } catch (error) {
    alert('Lỗi đăng ký: ' + error);
  }
};


export const logout = async () => {
  try {
    await signOut(auth);
    alert('Đã đăng xuất');
  } catch (error) {
    alert('Lỗi đăng xuất: ' + error);
  }
};

export const getUserInfo = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error('User info not found');
  }
};
