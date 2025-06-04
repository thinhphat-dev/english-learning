import { useState } from 'react';
import { Button, message, Spin, Card, Tooltip } from 'antd';
import { translatePartOfSpeech } from '@/utils/translation.helper';
import { saveFlashcard } from '@/service/flashcardService';
import { useAuthStore } from '@/store/auth.store';
import { useDictionaryQuery } from '@/hooks/useDictionary';
import { useMutation } from '@tanstack/react-query';
import Search from 'antd/es/input/Search';
import Title from 'antd/es/typography/Title';
import { BookOutlined } from '@ant-design/icons';

const DictionaryLookup = () => {
  const [word, setWord] = useState('');
  const [submittedWord, setSubmittedWord] = useState('');
  const { currentUser } = useAuthStore();
  const { data, isLoading, isError, refetch } = useDictionaryQuery(submittedWord, !!submittedWord);

  const handleSearch = async () => {
    if (!word) return message.warning('Vui lòng nhập từ cần tra.');
    setSubmittedWord(word);
    refetch();
  };
  const { mutate: saveWord, isPending } = useMutation({
    mutationFn: () =>
      saveFlashcard(
        {
          word: data?.wordData.word || '',
          meaning: data?.mean || '',
          imageUrl: data?.image?.urls.small || '',
        },
        currentUser!.uid,
      ),
    onSuccess: () => {
      message.success('Đã thêm vào flashcard!');
    },
    onError: (error: any) => {
      message.error(error.message || 'Lỗi khi lưu flashcard');
    },
  });
  const handleSave = () => {
    saveWord();
  };

  return (
    <div className='max-w-3xl mx-auto mt-[-20px] p-4'>
      <Title className='flex justify-center items-center' level={2} style={{ color: '#0b1b5d' }}>
        Từ Điển
      </Title>
      <div className='flex justify-center items-center mb-4'>
        <Search
          size='large'
          placeholder='Nhập từ cần tra'
          value={word}
          enterButton
          onChange={(e) => setWord(e.target.value)}
          onSearch={handleSearch}
          className='max-w-80'
        />
      </div>
      {isLoading && <Spin />}
      {isError && <p className='text-red-500'>Không tìm thấy từ hoặc lỗi kết nối.</p>}

      {data && (
        <Card title={data.wordData.word} className='shadow-even w-full rounded-2xl mb-10'>
          {data.mean && (
            <div className='bg-green-100 p-3 rounded mb-4'>
              <p className='font-semibold'>Nghĩa tiếng Việt:</p>
              <div className='ml-5'>{data.mean}</div>
            </div>
          )}

          {data.image && (
            <div className='mb-4 text-center'>
              <img src={data.image.urls.small} alt={data.image.alt_description} className='mx-auto rounded-md max-h-60' />
              <p className='text-xs text-gray-500 mt-1'>Hình ảnh từ Unsplash</p>
            </div>
          )}

          {data.wordData.phonetics.map((p, index) => (
            <div key={index} className='mb-2'>
              {p.text && <span className='font-semibold'>Phiên âm:</span>} {p.text}
              {p.audio?.includes('uk') ? <p>Giọng Anh - Anh</p> : <p>Giọng Anh - Mỹ</p>}
              {p.audio && (
                <audio controls src={p.audio} className='mt-1'>
                  Trình duyệt không hỗ trợ audio.
                </audio>
              )}
            </div>
          ))}

          {data.wordData.meanings.map((meaning, index) => (
            <div key={index} className='mt-4'>
              <p className='text-blue-600 font-semibold'>{translatePartOfSpeech(meaning.partOfSpeech)}</p>
              <ul className='list-disc ml-5'>
                {meaning.definitions.slice(0, 1).map((def, i) => (
                  <li key={i} className='mb-1'>
                    <div>{def.definition}</div>
                    {data.translations[index] && <div className='text-green-600 italic'>→ {data.translations[index]}</div>}
                    {def.example && <div className='text-gray-500 italic'>Ví dụ: {def.example}</div>}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {data.wordData.sourceUrls.length > 0 && (
            <p className='mt-4 text-sm text-gray-500'>
              Nguồn:{' '}
              <a href={data.wordData.sourceUrls[0]} className='underline' target='_blank' rel='noopener noreferrer'>
                {data.wordData.sourceUrls[0]}
              </a>
            </p>
          )}

          <div className='mt-6 text-right'>
            <Tooltip title={!currentUser ? 'Vui lòng đăng nhập để sử dụng' : ''}>
              <span>
                <Button
                  type='primary'
                  onClick={handleSave}
                  className='ml-2'
                  icon={<BookOutlined className='text-lg' />}
                  disabled={!currentUser}
                  loading={isPending}>
                  Thêm vào Flashcard
                </Button>
              </span>
            </Tooltip>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DictionaryLookup;
