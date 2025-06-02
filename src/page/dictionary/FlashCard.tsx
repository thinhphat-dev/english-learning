import { useState } from 'react';
import FlipCard from '@/components/card/Card';
import { useQuery } from '@tanstack/react-query';
import { fetchFlashcards } from '@/service/flashcardService';
import { useAuthStore } from '@/store/auth.store';
import { Button } from 'antd';

const FlashCard = () => {
  const { currentUser } = useAuthStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const {
    data: flashcards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['flashcards', currentUser?.uid],
    queryFn: () => fetchFlashcards(currentUser?.uid || ''),
    enabled: !!currentUser,
  });

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % (flashcards?.length || 1));
    }, 200);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + (flashcards?.length || 1)) % (flashcards?.length || 1));
    }, 200);
  };

  if (isLoading) {
    return <div className='text-center mt-10'>Đang tải từ vựng...</div>;
  } else if (isError || !flashcards || flashcards.length === 0) {
    return <div className='text-center mt-10'>Không có từ vựng nào</div>;
  } else {
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
          <Button onClick={handlePrev} size='large'>
            Quay lại
          </Button>
          <Button type='primary' size='large' onClick={handleNext}>
            Tiếp theo
          </Button>
        </div>
      </div>
    );
  }
};

export default FlashCard;
