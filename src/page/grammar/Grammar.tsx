import tenses from '@/constans/database/tensen2.json';
import { useState, useEffect } from 'react';
import { Select, Typography } from 'antd';
import type { Tense } from '@/types/grammar';
import { dataOptionAspect, dataOptionGrammar, dataOptionTense } from '@/constans/database/data-option';
import TenseCard from '@/components/grammar/TenseCard';
import DetailGrammarCard from '@/components/grammar/DetailGrammar';
const { Title } = Typography;

export default function GrammarPage() {
  const [selectedGrammarType, setGrammarType] = useState<string | null>(null);
  const [selectedCategory, setCategory] = useState<string | null>(null);
  const [selectedType, setType] = useState<string | null>(null);
  const [filteredTense, setFilteredTense] = useState<Tense | null>(null);

  useEffect(() => {
    if (selectedGrammarType !== 'Tenses') {
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
    if (selectedGrammarType === 'Tenses' && selectedCategory && selectedType) {
      const match = tenses.find((t) => t.category === selectedCategory && t.type === selectedType);
      setFilteredTense(match || null);
    }
  }, [selectedType, selectedCategory, selectedGrammarType]);

  return (
    <div className='space-y-6 p-4 '>
      <Title className='text-center' level={2} style={{ color: '#0b1b5d' }}>
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
        {selectedGrammarType === 'Tenses' && (
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
      {filteredTense && <TenseCard tense={filteredTense} />}
      {selectedGrammarType && selectedGrammarType !== 'Tenses' && <DetailGrammarCard grammarType={selectedGrammarType} />}
      {selectedGrammarType === 'Tenses' && !filteredTense && (
        <div className='text-center p-6 bg-gray-50 border rounded-md text-gray-500'>
          Vui lòng chọn thời gian và loại thì để xem chi tiết
        </div>
      )}
    </div>
  );
}
