import { useEffect, useState } from 'react';
import { auth, db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import FlipCard from '@/components/card/Card';
import type { FlashcardData } from '@/service/flashcardService';

const FlashCard = () => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const snapshot = await getDocs(collection(db, 'flashcards', user.uid, 'items'));
        const cards = snapshot.docs.map((doc) => doc.data() as FlashcardData);
        setFlashcards(cards);
      } catch (error) {
        console.error('Lỗi khi tải flashcards:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 200);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 200);
  };

  if (loading) return <div className='text-center mt-10'>Đang tải từ vựng...</div>;
  if (flashcards.length === 0) return <div className='text-center mt-10'>Không có từ vựng nào</div>;

  const currentCard = flashcards[currentIndex];

  return (
    <div className='flex flex-col mt-14 items-center min-h-[500px] gap-6 p-6'>
      <FlipCard
        front={currentCard.word}
        back={currentCard.meaning}
        imageUrl={currentCard.imageUrl}
        flipped={flipped}
        setFlipped={setFlipped}
      />

      <div className='flex gap-4 mt-4'>
        <button onClick={handlePrev} className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'>
          Quay lại
        </button>
        <button onClick={handleNext} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default FlashCard;
