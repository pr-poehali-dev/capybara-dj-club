
import { useState, useEffect } from 'react';

export type CapybaraType = 'regular' | 'male' | 'albino';

interface CapybaraProps {
  type: CapybaraType;
  position: { x: number; y: number };
  onRequestChange: (request: string) => void;
}

const songRequests = [
  "Хочу что-нибудь потяжелее!",
  "А можно что-то для медленного танца?",
  "Включи электро, пожалуйста!",
  "Хочу хип-хоп сейчас!",
  "Давай что-нибудь классическое!",
  "Можно ретро-хит?",
  "Хочу танцевать под техно!",
  "Сделай погромче бас!"
];

const CapybaraModel = ({ type, position, onRequestChange }: CapybaraProps) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [danceMoves, setDanceMoves] = useState(0);
  
  // Периодически меняем танцевальные движения
  useEffect(() => {
    const interval = setInterval(() => {
      setDanceMoves(prev => (prev + 1) % 3);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Случайно запрашиваем песню
  useEffect(() => {
    const requestInterval = Math.random() * 15000 + 5000; // от 5 до 20 секунд
    const timeout = setTimeout(() => {
      setIsRequesting(true);
      setTimeout(() => {
        setIsRequesting(false);
      }, 3000);
      
      const randomRequest = songRequests[Math.floor(Math.random() * songRequests.length)];
      onRequestChange(randomRequest);
    }, requestInterval);
    
    return () => clearTimeout(timeout);
  }, [onRequestChange]);
  
  // Стили в зависимости от типа капибары
  const getCapybaraStyles = () => {
    switch (type) {
      case 'male':
        return 'bg-club-darkPurple text-white font-bold';
      case 'albino':
        return 'bg-white text-black border-2 border-club-purple';
      default:
        return 'bg-amber-600 text-white';
    }
  };
  
  const getDanceAnimation = () => {
    switch (danceMoves) {
      case 0:
        return 'animate-bounce';
      case 1:
        return 'animate-pulse';
      case 2:
        return 'animate-[wiggle_1s_ease-in-out_infinite]';
      default:
        return '';
    }
  };
  
  return (
    <div 
      className={`absolute rounded-full p-2 flex items-center justify-center transition-all duration-300 ${getCapybaraStyles()} ${getDanceAnimation()}`}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        width: type === 'male' ? '65px' : '50px',
        height: type === 'male' ? '65px' : '50px',
      }}
    >
      {type === 'male' && '♂'}
      {type === 'albino' && '❄'}
      {isRequesting && (
        <div className="absolute -top-10 bg-black bg-opacity-80 text-white p-2 rounded-lg text-xs w-32 z-10">
          {songRequests[Math.floor(Math.random() * songRequests.length)]}
        </div>
      )}
    </div>
  );
};

export default CapybaraModel;
