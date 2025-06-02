import { auth, db } from '@/config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
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

export const fetchFlashcards = async (uid: string): Promise<FlashcardData[]> => {
  const snapshot = await getDocs(collection(db, 'flashcards', uid, 'items'));
  return snapshot.docs.map((doc) => doc.data() as FlashcardData);
};
