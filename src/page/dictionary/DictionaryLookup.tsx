import { useState } from 'react';
import { Input, Button, Form, message, Spin, Card, Tooltip } from 'antd';
import { translatePartOfSpeech } from '@/utils/translation.helper';
import { saveFlashcard } from '@/service/flashcardService';
import { useAuthStore } from '@/store/auth.store';
import { useDictionaryQuery } from '@/hooks/useDictionary';

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

  const handleSave = async () => {
    try {
      await saveFlashcard({
        word: data?.wordData.word || '',
        meaning: data?.mean || '',
        imageUrl: data?.image?.urls.small || '',
      });
      message.success('Đã thêm vào flashcard!');
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  return (
    <div className='max-w-3xl mx-auto  p-4'>
      <Form layout='inline' onFinish={handleSearch} className='mb-6'>
        <Form.Item>
          <Input placeholder='Nhập từ tiếng Anh...' value={word} onChange={(e) => setWord(e.target.value)} className='w-64' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Tra từ
          </Button>
        </Form.Item>
      </Form>

      {isLoading && <Spin />}
      {isError && <p className='text-red-500'>Không tìm thấy từ hoặc lỗi kết nối.</p>}

      {data && (
        <Card title={data.wordData.word} className='shadow-xl rounded-2xl mb-10'>
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
                <Button type='default' onClick={handleSave} className='ml-2' disabled={!currentUser}>
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
