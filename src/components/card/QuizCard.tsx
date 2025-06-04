import { useState, useEffect } from 'react';
import { Card, Button, Typography, Image } from 'antd';
import type { VocabularyQuizItem,  GrammarQuizItem } from '@/types/Exercise/QuizCard.type';

const { Title, Text } = Typography;

interface QuizCardProps {
  currentQuestion: VocabularyQuizItem | GrammarQuizItem;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswerSelected: (isCorrect: boolean, selectedOption: string) => void;
}

const QuizCard = ({ currentQuestion, currentQuestionIndex, totalQuestions, onAnswerSelected }: QuizCardProps) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  useEffect(() => {
    setSelectedButton(null);
  }, [currentQuestionIndex]);

  const handleButtonClick = (option: string) => {
    if (selectedButton !== null) {
      return;
    }
    setSelectedButton(option);
    const isCorrect = option === currentQuestion.correct_answer;
    setTimeout(() => {
      onAnswerSelected(isCorrect, option);
    }, 1000);
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className='mt-8'>
      <Card className='mb-6 border-2 border-blue-200'>
        <div className='text-center mb-4'>
          <Text type='secondary' className='text-lg'>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Text>
        </div>
        {currentQuestion.photoUrl && (
          <div className='mb-4 flex justify-center'>
            <Image
              src={currentQuestion.photoUrl}
              alt={currentQuestion.correct_answer}
              className='max-h-64 object-contain rounded-md shadow-sm'
              fallback='https://via.placeholder.com/200?text=No+Image'
            />
          </div>
        )}
        <Title level={4} className='text-center mb-6 text-gray-800'>
          {currentQuestion.question || "What is this?"} 
        </Title>
        <div className='flex flex-wrap -mx-2'>
          {currentQuestion.options.map((option) => (
            <div key={option} className='w-1/2 px-2 mb-4'>
              <Button
                type='default'
                className={`w-full h-auto py-4 text-lg font-semibold rounded-md shadow-sm transition-all duration-200
                  ${selectedButton === option ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300 hover:border-blue-300'}
                `}
                onClick={() => handleButtonClick(option)}
                disabled={selectedButton !== null}>
                {option}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default QuizCard;
