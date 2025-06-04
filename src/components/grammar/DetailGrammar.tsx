import { Card, Collapse, Divider, List, Typography } from 'antd';
import adverbData from '@/constans/database/adverb.json'; // Make sure this path is correct
import adjectiveData from '@/constans/database/adjectives.json';
import nounData from '@/constans/database/noun.json';
import verbData from '@/constans/database/verbs.json';
import { useEffect, useState } from 'react';
import type { GrammarItem } from '@/types/grammar';

const { Title, Text } = Typography;
const { Panel } = Collapse;

type Props = {
  grammarType: string | null;
};

const GrammarDetailCard = ({ grammarType }: Props) => {
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarItem>();

  useEffect(() => {
    if (grammarType == 'nouns') {
      setSelectedGrammar(nounData);
    }
    if (grammarType == 'verbs') {
      setSelectedGrammar(verbData);
    }
    if (grammarType == 'adjectives') {
      setSelectedGrammar(adjectiveData);
    }
    if (grammarType == 'adverbs') {
      setSelectedGrammar(adverbData);
    }
  }, [grammarType]);
  if (!selectedGrammar) {
    return <div className='text-center text-gray-500 p-6'>Vui lòng chọn một loại ngữ pháp để xem chi tiết.</div>;
  }
  return (
    <div className='p-6 w-full mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-xl'>
      <Title level={3}>
        {selectedGrammar.title_vn}
        <span className='block sm:inline text-c-main-color'> ( {selectedGrammar.type} )</span>
      </Title>

      <Card bordered={false} className='mb-6 shadow-lg rounded-xl bg-white'>
        <Divider className='custom-divider-color'>
          <div className='text-c-sec-color font-bold'>Định nghĩa</div>
        </Divider>
        <Text className='text-gray-700 leading-relaxed'>{selectedGrammar.definition}</Text>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
        <div>
          <Divider className='custom-divider-color'>
            <div className='text-c-sec-color font-bold'>Phân loại trạng từ</div>
          </Divider>
          <Card bordered={false} className='shadow-lg rounded-xl bg-white'>
            <Title level={4} className='text-blue-600 border-b pb-2 mb-3'>
              Phân loại trạng từ
            </Title>
            <Collapse accordion expandIconPosition='right' className='rounded-lg overflow-hidden'>
              {selectedGrammar.categories.map((category, idx) => (
                <Panel
                  header={
                    <Text strong className='text-lg text-gray-800'>
                      {category.name}
                    </Text>
                  }
                  key={idx}
                  className='bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ease-in-out'>
                  <Text className='block mb-3 text-gray-700 leading-relaxed'>{category.description}</Text>
                  <Text strong className='text-blue-700'>
                    Ví dụ:{' '}
                  </Text>
                  <Text className='text-gray-800'>{category.examples.join(', ')}</Text>
                </Panel>
              ))}
            </Collapse>
          </Card>
        </div>
        <div>
          <Divider className='custom-divider-color'>
            <div className='text-c-sec-color font-bold'>Ví dụ minh họa</div>
          </Divider>

          <Card bordered={false} className='mb-6 shadow-lg rounded-xl bg-white'>
            <Title level={4} className='text-blue-600 border-b pb-2 mb-3'>
              Ví dụ minh họa
            </Title>
            <List
              itemLayout='vertical'
              dataSource={adverbData.examples}
              renderItem={(item) => (
                <List.Item className='py-3 border-b border-gray-100 last:border-0'>
                  <div className='flex flex-col'>
                    <Text strong className='text-indigo-800 text-lg'>
                      "{item.sentence}"
                    </Text>
                    <Text italic className='text-gray-600 text-base'>
                      {item.translation}
                    </Text>
                    {item.note && (
                      <Text className='text-sm text-blue-500 mt-1'>
                        <span className='font-semibold'>Lưu ý:</span> {item.note}
                      </Text>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>

      <Card bordered={false} className='mb-6 shadow-lg rounded-xl bg-white'>
        <Divider className='custom-divider-color'>
          <div className='text-c-sec-color font-bold'>Dấu hiệu nhận biết</div>
        </Divider>
        <List
          dataSource={selectedGrammar.signals}
          renderItem={(item) => (
            <List.Item className='border-b border-gray-100 last:border-0 py-2'>
              <Text className='text-gray-700'>✅ {item}</Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default GrammarDetailCard;
