import tenses from '@/constans/database/tensen2.json';
import { useState, useEffect } from 'react';
import { Select, Card, Typography, Divider } from 'antd';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import Paragraph from 'antd/es/typography/Paragraph';
import type { Tense } from '@/types/grammar';
import { dataOptionAspect, dataOptionGrammar, dataOptionTense } from '@/constans/database/data-option';
const { Title, Text } = Typography;

export default function GrammarPage() {
  const [selectedGrammarType, setGrammarType] = useState<string | null>(null);
  const [selectedCategory, setCategory] = useState<string | null>(null);
  const [selectedType, setType] = useState<string | null>(null);
  const [filteredTense, setFilteredTense] = useState<Tense | null>(null);

  useEffect(() => {
    if (selectedGrammarType !== 'tenses') {
      setCategory(null);
      setType(null);
      setFilteredTense(null);
    }
  }, [selectedGrammarType]);

  useEffect(() => {
    const validTypes = tenses.filter((t) => t.category === selectedCategory).map((t) => t.type);
    if (!validTypes.includes(selectedType || '')) {
      setType(null);
      setFilteredTense(null);
    } else {
      const match = tenses.find((t) => t.category === selectedCategory && t.type === selectedType);
      setFilteredTense(match || null);
    }
  }, [selectedCategory, selectedType]);

  useEffect(() => {
    if (selectedGrammarType === 'tenses' && selectedCategory && selectedType) {
      const match = tenses.find((t) => t.category === selectedCategory && t.type === selectedType);
      setFilteredTense(match || null);
    }
  }, [selectedType, selectedCategory, selectedGrammarType]);

  return (
    <div className='space-y-6 p-4 '>
      <Title className='flex items-center justify-center' level={2} style={{ color: '#0b1b5d' }}>
        Ngữ Pháp Tiếng Anh
      </Title>
      <div className='flex flex-col md:flex-row gap-4'>
        <Select
          placeholder='Loại ngữ pháp'
          value={selectedGrammarType}
          onChange={setGrammarType}
          options={dataOptionGrammar}
          className='w-full md:w-1/3'
        />
        {selectedGrammarType === 'tenses' && (
          <>
            <Select
              placeholder='Thời gian'
              value={selectedCategory}
              options={dataOptionTense}
              onChange={setCategory}
              className='w-full md:w-1/3'
            />
            <Select
              placeholder='Loại thì'
              value={selectedType}
              onChange={setType}
              className='w-full md:w-1/3'
              disabled={!selectedCategory}
              options={dataOptionAspect}></Select>
          </>
        )}
      </div>
      {filteredTense && (
        <Card className='mt-6 shadow-even '>
          <Title level={3}>
            {filteredTense.name}
            <span className='block sm:inline text-c-main-color'> ( {filteredTense.tense} )</span>
          </Title>
          <div className='flex flex-col gap-6 mt-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
              <div>
                <Divider className='custom-divider-color'>
                  <div className='text-c-sec-color font-bold'>Cấu trúc</div>
                </Divider>
                {['affirmative', 'negative', 'question'].map((key) => (
                  <div key={key} className='flex items-start gap-2'>
                    {key === 'affirmative' ? (
                      <PlusOutlined className='text-xl text-green-600' />
                    ) : key === 'negative' ? (
                      <MinusOutlined className='text-xl text-red-600' />
                    ) : (
                      <QuestionOutlined className='text-xl text-yellow-500' />
                    )}
                    <div className='flex flex-col md:flex-row md:items-start gap-1'>
                      <Text strong className='min-w-[100px]'>
                        {key === 'affirmative' ? 'Khẳng định' : key === 'negative' ? 'Phủ định' : 'Nghi vấn'}:
                      </Text>
                      <Text>{filteredTense.structure[key as keyof typeof filteredTense.structure]}</Text>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <Divider className='custom-divider-color'>
                  <div className='text-c-sec-color font-bold'>Ví dụ</div>
                </Divider>
                {filteredTense.examples.map((ex, i) => (
                  <div key={i} className='flex items-start gap-2'>
                    {ex.type === 'affirmative' ? (
                      <PlusOutlined className='text-xl text-green-600' />
                    ) : ex.type === 'negative' ? (
                      <MinusOutlined className='text-xl text-red-600' />
                    ) : (
                      <QuestionOutlined className='text-xl text-yellow-500' />
                    )}
                    <div className='flex flex-col md:flex-row md:items-start gap-1'>
                      <Text strong className='min-w-[100px]'>
                        {ex.type === 'affirmative' ? 'Khẳng định' : ex.type === 'negative' ? 'Phủ định' : 'Nghi vấn'}:
                      </Text>
                      <Text>{ex.sentence}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Divider className='custom-divider-color'>
                <div className='text-c-sec-color font-bold'>Cách dùng</div>
              </Divider>
              <Paragraph className='text-gray-700 leading-relaxed whitespace-pre-line'>
                {filteredTense.usage.map((use, i) => (
                  <div key={i} className='mb-4'>
                    <Title level={5}>{use.title}</Title>
                    <ul className='ml-4 list-disc'>
                      {use.examples.map((ex, j) => (
                        <li key={j}>
                          <Text strong>{ex.vi ? `${ex.vi}: ` : ''}</Text>
                          <Text>{ex.en}</Text>
                          <br />
                          <Text className='text-c-third-color'>{ex.vi_ex}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Paragraph>
              {filteredTense.signalWords && filteredTense.signalWords.length > 0 && (
                <div className='mt-[-10px]'>
                  <Divider variant='dashed' dashed className='custom-divider-color'>
                    <div className='text-c-sec-color font-bold'>Từ khóa nhận biết</div>
                  </Divider>
                  <div className='flex flex-wrap gap-2'>
                    {filteredTense.signalWords.map((word, index) => (
                      <span key={index} className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm'>
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
      {!filteredTense && selectedGrammarType && (
        <div className='text-center p-6 bg-gray-50 border rounded-md text-gray-500'>
          {selectedGrammarType === 'tenses'
            ? 'Vui lòng chọn thời gian và loại thì để xem chi tiết'
            : 'Chức năng này đang được phát triển'}
        </div>
      )}
    </div>
  );
}
