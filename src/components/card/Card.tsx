import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface FlipCardProps {
  front: string;
  back: string;
  imageUrl?: string;
  flipped: boolean;
  setFlipped: (value: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
}

const FlipCard = ({ front, back, imageUrl, flipped, setFlipped, onPrev, onNext }: FlipCardProps) => {
  return (
    <div className='relative w-96 h-64 [perspective:1000px] cursor-pointer' onClick={() => setFlipped(!flipped)}>
      <Button
        shape='circle'
        icon={<LeftOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        size='large'
        className='hidden md:block absolute left-[-50px] top-1/2 -translate-y-1/2 z-10'
      />
      <Button
        shape='circle'
        icon={<RightOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        size='large'
        className='hidden md:block absolute right-[-50px] top-1/2 -translate-y-1/2 z-10'
      />
      <div
        className={`relative w-full bg-white rounded-xl h-full transition-transform duration-500 transform ${
          flipped ? 'rotate-y-180' : ''
        } [transform-style:preserve-3d]`}>
        <div className='absolute w-full h-full border rounded-2xl shadow-even flex items-center justify-center text-2xl font-bold backface-hidden'>
          {front}
        </div>
        <div className='absolute w-full h-full  border rounded-2xl shadow-even flex flex-col items-center justify-center text-center p-4 rotate-y-180 backface-hidden'>
          <p className='text-xl font-medium mb-4'>{back}</p>
          {imageUrl && <img src={imageUrl} alt={front} className='w-[240px] h-[180px] object-contain' />}
        </div>
      </div>
      <div className='flex gap-4 justify-between mt-4 md:hidden' onClick={(e) => e.stopPropagation()}>
        <Button shape='circle' icon={<LeftOutlined />} onClick={onPrev} size='large' />
        <Button shape='circle' icon={<RightOutlined />} onClick={onNext} size='large' />
      </div>
    </div>
  );
};

export default FlipCard;
