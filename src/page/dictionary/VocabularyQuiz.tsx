import { useState, useEffect } from 'react';
import { Select, Card, Typography } from 'antd';
import ExerciseData from '@/constans/database/vocabulary-quiz-data.json'; 
import QuizCard from '@/components/card/QuizCard';
import type { VocabularyQuizItem } from '@/types/Exercise/QuizCard.type';

const { Option } = Select;
const { Title, Text } = Typography;

const VocabularyQuiz = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [filteredQuestions, setFilteredQuestions] = useState<VocabularyQuizItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string | null }>({});
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const categories = Array.from(new Set(ExerciseData.map((item) => item.category)));

  const handleCategoryChange = (value: string) => {
    resetQuiz();
    setSelectedCategory(value);
  };

  const handleAnswerSelected = (isCorrect: boolean, selectedOption: string) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      let finalCorrectCount = 0;
      const updatedUserAnswers = {
        ...userAnswers,
        [currentQuestionIndex]: selectedOption,
      };
      filteredQuestions.forEach((q, index) => {
        if (updatedUserAnswers[index] === q.correct_answer) {
          finalCorrectCount++;
        }
      });
      setCorrectAnswersCount(finalCorrectCount);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(undefined);
    setFilteredQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setCorrectAnswersCount(0);
    setShowResult(false);
  };

  useEffect(() => {
    if (selectedCategory) {
      const filtered = ExerciseData.filter((item) => item.category === selectedCategory);
      setFilteredQuestions(filtered);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setCorrectAnswersCount(0);
      setShowResult(false);
    }
  }, [selectedCategory]);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center p-4'>
      <Card className='w-full max-w-2xl shadow-lg rounded-lg p-6 bg-white'>
        <Title level={2} className='text-center mb-6 text-blue-600'>
          Trắc Nghiệm Từ Vựng
        </Title>
        <div className='mb-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
          <Text strong className='text-lg'>
            Chọn Chủ Đề:
          </Text>
          <Select
            placeholder='Chọn chủ đề'
            style={{ width: 200 }}
            onChange={handleCategoryChange}
            value={selectedCategory}
            className='w-full sm:w-auto'>
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>
        {selectedCategory && filteredQuestions.length > 0 && !showResult && (
          <QuizCard
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={filteredQuestions.length}
            onAnswerSelected={handleAnswerSelected}
          />
        )}
        {showResult && (
          <div className='mt-8 text-center'>
            <Title level={3} className='text-green-600 mb-4'>
              Hoàn Thành!
            </Title>
            <Text strong className='text-xl'>
              Số câu đúng {correctAnswersCount} trên tổng số {filteredQuestions.length} câu!
            </Text>
          </div>
        )}
        {!selectedCategory && (
          <div className='mt-8 text-center text-gray-600'>
            <Text>Chọn chủ đề để bắt đầu làm bài.</Text>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VocabularyQuiz;
