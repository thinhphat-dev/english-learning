import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const updateQuizProgress = async (
  userId: string,
  type: 'vocabulary' | 'grammar',
  completedCount: number,
  category: string,
) => {
  const userRef = doc(db, 'quizProgress', userId);
  const snapshot = await getDoc(userRef);
  const data = snapshot.data();
  const completedField = type + 'Completed';
  const categoryField = type + 'Categories';
  const currentCompleted = data?.[completedField] || 0;
  const currentCategories: string[] = data?.[categoryField] || [];
  if (currentCategories.includes(category)) {
    return;
  }
  if (snapshot.exists()) {
    await updateDoc(userRef, {
      [completedField]: currentCompleted + completedCount,
      [categoryField]: [...currentCategories, category],
    });
  } else {
    await setDoc(userRef, {
      vocabularyCompleted: type === 'vocabulary' ? completedCount : 0,
      grammarCompleted: type === 'grammar' ? completedCount : 0,
      vocabularyCategories: type === 'vocabulary' ? [category] : [],
      grammarCategories: type === 'grammar' ? [category] : [],
    });
  }
};

export const getTotalCompletedQuizs = async (userId: string) => {
  const userRef = doc(db, 'quizProgress', userId);
  const snapshot = await getDoc(userRef);
  const data = snapshot.data();
  return (data?.vocabularyCompleted || 0) + (data?.grammarCompleted || 0);
};
