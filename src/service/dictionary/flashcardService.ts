import { auth, db } from '@/config/firebase';
import { collection, addDoc, getDocs, query, where, doc, setDoc, updateDoc } from 'firebase/firestore';

export interface FlashcardData {
  id?: string;
  word: string;
  meaning: string;
  imageUrl: string;
  createdAt?: Date;
  learned?: boolean;
}


export const saveFlashcard = async (data: FlashcardData, userId: string): Promise<void> => {
  const itemsRef = collection(db, 'flashcards', userId, 'items');
  const q = query(itemsRef, where('word', '==', data.word));
  const snapshot = await getDocs(q);
  const user = auth.currentUser;
  if (!user) throw new Error('Bạn chưa đăng nhập');
  if (!snapshot.empty) {
    const existingDoc = snapshot.docs[0];
    const existingData = existingDoc.data() as FlashcardData;
    if (existingData.learned) {
      const docRef = doc(db, 'flashcards', user.uid, 'items', existingDoc.id);
      await setDoc(docRef, { ...existingData, learned: false }, { merge: true });
      return;
    }
    throw new Error('Từ này đã tồn tại trong Flashcard!');
  }
  await addDoc(collection(db, 'flashcards', user.uid, 'items'), {
    ...data,
    learned: false,
    createdAt: data.createdAt || new Date(),
  });
};

export const fetchFlashcards = async (uid: string): Promise<FlashcardData[]> => {
  const itemsRef = collection(db, 'flashcards', uid, 'items');
  const q = query(itemsRef, where('learned', '==', false));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as FlashcardData[];
};

export const deleteFlashcard = async (userId: string, flashcardId: string): Promise<void> => {
  const docRef = doc(db, 'flashcards', userId, 'items', flashcardId);
  await updateDoc(docRef, { learned: true });
};

export const getCountLearnedFlashcards = async (userId: string): Promise<number> => {
  const itemsRef = collection(db, 'flashcards', userId, 'items');
  const q = query(itemsRef, where('learned', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.size || 0;
};