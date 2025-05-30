import { auth, db } from '@/config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export interface FlashcardData {
  word: string;
  meaning: string;
  imageUrl: string;
  createdAt?: Date;
}
export const saveFlashcard = async (data: FlashcardData): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Bạn chưa đăng nhập');
  }
  console.log('Data gửi lên:', data);
  await addDoc(collection(db, 'flashcards', user.uid, 'items'), {
    ...data,
    createdAt: data.createdAt || new Date(),
  });
};
