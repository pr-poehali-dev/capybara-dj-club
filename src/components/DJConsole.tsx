
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface DJConsoleProps {
  onChangeSong: (genre: string) => void;
  currentSong: string;
  popularity: number;
}

const genres = [
  { name: 'Электро', icon: 'Zap' },
  { name: 'Хип-хоп', icon: 'HeadphonesIcon' },
  { name: 'Рок', icon: 'Flame' },
  { name: 'Поп', icon: 'Music' },
  { name: 'Техно', icon: 'Disc' },
  { name: 'Классика', icon: 'Piano' }
];

const DJConsole = ({ onChangeSong, currentSong, popularity }: DJConsoleProps) => {
  const [volume, setVolume] = useState<number[]>([75]);
  const [bass, setBass] = useState<number[]>([50]);
  const [tempo, setTempo] = useState<number[]>([50]);
  
  return (
    <div className="bg-club-dimmed rounded-xl p-6 text-white w-full max-w-2xl mx-auto shadow-lg border border-club-purple">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-club-neon">DJ Пульт</h2>
        <div className="text-club-pink">
          <span className="mr-2">Популярность клуба:</span>
          <span className="font-bold text-xl">{popularity}%</span>
        </div>
      </div>
      
      <div className="mb-6 p-4 bg-black bg-opacity-30 rounded-lg">
        <div className="text-center mb-2 text-lg font-semibold">Сейчас играет</div>
        <div className="text-center text-2xl font-bold text-club-neon animate-pulse">{currentSong}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium">Громкость</label>
          <Slider
            value={volume}
            max={100}
            step={1}
            onValueChange={setVolume}
            className="my-4"
          />
          
          <label className="block text-sm font-medium">Низкие частоты</label>
          <Slider
            value={bass}
            max={100}
            step={1}
            onValueChange={setBass}
            className="my-4"
          />
          
          <label className="block text-sm font-medium">Темп</label>
          <Slider
            value={tempo}
            max={100}
            step={1}
            onValueChange={setTempo}
            className="my-4"
          />
        </div>
        
        <div className="border-l border-gray-700 pl-4">
          <h3 className="font-medium mb-3">Выбрать жанр:</h3>
          <div className="grid grid-cols-2 gap-2">
            {genres.map((genre) => (
              <Button
                key={genre.name}
                variant="outline"
                onClick={() => onChangeSong(genre.name)}
                className={`border-club-purple hover:bg-club-purple hover:text-white ${currentSong.includes(genre.name) ? 'bg-club-purple text-white' : 'text-white'}`}
              >
                <Icon name={genre.icon} fallback="Music" />
                {genre.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          className="bg-club-neon hover:bg-club-neon/80 text-black font-bold"
          onClick={() => {
            const randomGenre = genres[Math.floor(Math.random() * genres.length)];
            onChangeSong(randomGenre.name);
          }}
        >
          <Icon name="Shuffle" />
          Случайный трек
        </Button>
      </div>
    </div>
  );
};

export default DJConsole;
