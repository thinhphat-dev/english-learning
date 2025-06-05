import { Card, Typography, Divider } from 'antd';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import type { Tense } from '@/types/grammar';
import Paragraph from 'antd/es/typography/Paragraph';

const { Title, Text } = Typography;

type TenseCardProps = {
  tense: Tense;
};

const TenseCard = (tense: TenseCardProps) => {
  return (
    <Card className='mt-6 shadow-even '>
      <Title level={3}>
        {tense.tense.name}
        <span className='block sm:inline text-c-main-color'> ( {tense.tense.tense} )</span>
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
                  <Text>{tense.tense.structure[key as keyof typeof tense.tense.structure]}</Text>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Divider className='custom-divider-color'>
              <div className='text-c-sec-color font-bold'>Ví dụ</div>
            </Divider>
            {tense.tense.examples.map((ex, i) => (
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
            {tense.tense.usage.map((use, i) => (
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
          {tense.tense.signalWords && tense.tense.signalWords.length > 0 && (
            <div className='mt-[-10px]'>
              <Divider variant='dashed' dashed className='custom-divider-color'>
                <div className='text-c-sec-color font-bold'>Từ khóa nhận biết</div>
              </Divider>
              <div className='flex flex-wrap gap-2'>
                {tense.tense.signalWords.map((word, index) => (
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
  );
};

export default TenseCard;
