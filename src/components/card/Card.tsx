interface FlipCardProps {
  front: string;
  back: string;
  imageUrl?: string;
  flipped: boolean;
  setFlipped: (value: boolean) => void;
}

const FlipCard = ({ front, back, imageUrl, flipped, setFlipped }: FlipCardProps) => {
  return (
    <div className='w-96 h-64 [perspective:1000px] cursor-pointer' onClick={() => setFlipped(!flipped)}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${
          flipped ? 'rotate-y-180' : ''
        } [transform-style:preserve-3d]`}>
        <div className='absolute w-full h-full bg-white border rounded-2xl shadow-lg flex items-center justify-center text-2xl font-bold backface-hidden'>
          {front}
        </div>
        <div className='absolute w-full h-full bg-blue-100 border rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-4 rotate-y-180 backface-hidden'>
          <p className='text-xl font-medium mb-4'>{back}</p>
          {imageUrl && <img src={imageUrl} alt={front} className='w-[240px] h-[180px] object-contain rounded-lg shadow-md' />}
        </div>
      </div>
    </div>
  );
};
export default FlipCard;
