import { auth, db } from '@/config/firebase';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
export interface FlashcardData {
  id: string;
  word: string;
  meaning: string;
  imageUrl: string;
  createdAt?: Date;
}
export const saveFlashcard = async (data: FlashcardData, userId: string): Promise<void> => {
  const itemsRef = collection(db, 'flashcards', userId, 'items');
  const q = query(itemsRef, where('word', '==', data.word));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    throw new Error('Từ này đã tồn tại trong Flashcard!');
  }
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Bạn chưa đăng nhập');
  }
  await addDoc(collection(db, 'flashcards', user.uid, 'items'), {
    ...data,
    createdAt: data.createdAt || new Date(),
  });
};

export const fetchFlashcards = async (uid: string): Promise<FlashcardData[]> => {
  const snapshot = await getDocs(collection(db, 'flashcards', uid, 'items'));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as FlashcardData[];
};

export const deleteFlashcard = async (userId: string, flashcardId: string) => {
  console.log(flashcardId);
  const docRef = doc(db, 'flashcards', userId, 'items', flashcardId);
  await deleteDoc(docRef);
};
