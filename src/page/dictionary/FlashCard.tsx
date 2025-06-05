import { useState } from 'react';
import FlipCard from '@/components/card/Card';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteFlashcard, fetchFlashcards } from '@/service/dictionary/flashcardService';
import { useAuthStore } from '@/store/auth.store';
import Title from 'antd/es/typography/Title';
import { Button, Popconfirm } from 'antd';

const FlashCard = () => {
  const { currentUser } = useAuthStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: flashcards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['flashcards', currentUser?.uid],
    queryFn: () => fetchFlashcards(currentUser?.uid || ''),
    enabled: !!currentUser,
  });

  const deleteMutation = useMutation({
    mutationFn: (flashcardId: string) => deleteFlashcard(currentUser?.uid || '', flashcardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcards', currentUser?.uid] });
      setCurrentIndex(0);
      setFlipped(false);
    },
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
      <>
        <Title className='text-center' level={2} style={{ color: '#0b1b5d' }}>
          Flash Card
        </Title>
        <div className='relative flex flex-col mt-14 items-center min-h-[500px] gap-6 p-6'>
          <FlipCard
            front={currentCard.word}
            back={currentCard.meaning}
            imageUrl={currentCard.imageUrl}
            flipped={flipped}
            setFlipped={setFlipped}
            onPrev={handlePrev}
            onNext={handleNext}
          />
          <Popconfirm
            placement='bottomLeft'
            title='Bạn muốn xóa từ này khỏi flashcard?'
            description='Bạn đã thuộc từ này?'
            okText='Xóa'
            cancelText='Chưa'
            okButtonProps={{
              loading: deleteMutation.isPending,
              danger: true,
              className: 'bg-red-500 hover:bg-red-600 border-none',
            }}
            onConfirm={() => {
              deleteMutation.mutate(currentCard.id);
            }}>
            <Button className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition'>Xoá từ này</Button>
          </Popconfirm>
        </div>
      </>
    );
  }
};

export default FlashCard;
