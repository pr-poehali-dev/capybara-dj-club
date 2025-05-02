
import React, { useState, useEffect } from 'react';
import CapybaraModel, { CapybaraType } from './CapybaraModel';

interface DancefloorProps {
  currentSong: string;
  onRequestReceived: (request: string) => void;
  onPopularityChange: (newPopularity: number) => void;
}

interface Capybara {
  id: number;
  type: CapybaraType;
  position: { x: number; y: number };
}

const Dancefloor = ({ currentSong, onRequestReceived, onPopularityChange }: DancefloorProps) => {
  const [capybaras, setCapybaras] = useState<Capybara[]>([]);
  const [nextId, setNextId] = useState(1);
  const [lastSpawnTime, setLastSpawnTime] = useState(Date.now());
  
  // Добавление новых капибар на танцпол
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastSpawn = currentTime - lastSpawnTime;
      
      if (timeSinceLastSpawn > 3000 && capybaras.length < 12) { // Максимум 12 капибар на танцполе
        // Определяем тип новой капибары
        let type: CapybaraType = 'regular';
        const random = Math.random();
        
        if (random < 0.15) {
          type = 'albino'; // 15% шанс альбиноса
        } else if (random < 0.35) {
          type = 'male'; // 20% шанс самца
        }
        
        const newCapybara: Capybara = {
          id: nextId,
          type,
          position: {
            x: 10 + Math.random() * 80, // Распределяем по танцполу
            y: 10 + Math.random() * 60
          }
        };
        
        setCapybaras(prev => [...prev, newCapybara]);
        setNextId(prev => prev + 1);
        setLastSpawnTime(currentTime);
        
        // Увеличиваем популярность с новым посетителем
        onPopularityChange(prevPopularity => Math.min(100, prevPopularity + 2));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [capybaras.length, nextId, lastSpawnTime, onPopularityChange]);
  
  // Случайные перемещения капибар
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCapybaras(prev => 
        prev.map(capybara => ({
          ...capybara,
          position: {
            x: Math.max(5, Math.min(95, capybara.position.x + (Math.random() * 10 - 5))),
            y: Math.max(5, Math.min(75, capybara.position.y + (Math.random() * 10 - 5)))
          }
        }))
      );
    }, 3000);
    
    return () => clearInterval(moveInterval);
  }, []);
  
  // Иногда капибары уходят
  useEffect(() => {
    const leaveInterval = setInterval(() => {
      if (capybaras.length > 0 && Math.random() < 0.2) {
        setCapybaras(prev => {
          const newCapybaras = [...prev];
          newCapybaras.splice(Math.floor(Math.random() * newCapybaras.length), 1);
          return newCapybaras;
        });
        
        // Уменьшаем популярность, когда капибара уходит
        onPopularityChange(prevPopularity => Math.max(0, prevPopularity - 5));
      }
    }, 10000);
    
    return () => clearInterval(leaveInterval);
  }, [capybaras.length, onPopularityChange]);
  
  return (
    <div className="relative bg-club-dimmed h-[500px] rounded-xl p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80')] bg-cover bg-center opacity-20"></div>
      
      <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white p-2 rounded z-10">
        <p className="text-sm font-medium">Сейчас играет:</p>
        <p className="text-lg font-bold text-club-neon">{currentSong}</p>
      </div>
      
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white p-2 rounded z-10">
        <p className="text-sm">Капибар в клубе: {capybaras.length}</p>
      </div>
      
      {/* Танцпол с эффектами */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
        {Array.from({ length: 144 }).map((_, index) => (
          <div 
            key={index} 
            className={`border border-club-neon ${index % 2 === 0 ? 'bg-club-purple/20' : 'bg-black/40'}`}
          />
        ))}
      </div>
      
      {/* Капибары на танцполе */}
      {capybaras.map((capybara) => (
        <CapybaraModel
          key={capybara.id}
          type={capybara.type}
          position={capybara.position}
          onRequestChange={onRequestReceived}
        />
      ))}
    </div>
  );
};

export default Dancefloor;
