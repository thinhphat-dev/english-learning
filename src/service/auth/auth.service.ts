import { auth, db } from '@/config/firebase';
import type { LoginParams, RegisterParams } from '@/types/request.type';
import type { UserInfo } from '@/types/response.type';
import { message } from 'antd';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

export const loginWithPassword = async (values: LoginParams) => {
  const { email, password } = values;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email || '', password || '');
    message.success(`Đăng nhập thành công: ${userCredential.user.email}`);
  } catch (error) {
    message.error('Lỗi đăng nhập: ' + error);
  }
};

export const register = async (values: RegisterParams) => {
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
    message.success(`Đăng ký thành công`);
  } catch (error) {
    message.error('Lỗi đăng ký: ' + error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    message.success('Đã đăng xuất');
  } catch (error) {
    message.error('Lỗi đăng xuất: ' + error);
  }
};

export const fetchUserData = async (uid: string): Promise<UserInfo> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      fullname: data.fullname || '',
      email: data.email || '',
      level: data.level || 'NEWBIE',
    };
  } else {
    throw new Error('User not found');
  }
};

export const updateUserInfo = async (uid: string, data: Partial<UserInfo>) => {
  await updateDoc(doc(db, 'users', uid), data);
  return data;
};