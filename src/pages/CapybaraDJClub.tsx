
import React, { useState, useEffect } from 'react';
import DJConsole from '@/components/DJConsole';
import Dancefloor from '@/components/Dancefloor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';

const songs = {
  'Электро': [
    'DJ Капиbara - Электрокапи', 
    'Capybara Waves - Электронный пульс', 
    'The CapyBeats - Волны синтезатора'
  ],
  'Хип-хоп': [
    'MC Capy - Водный рэп', 
    'Капибарят - Болотный флоу', 
    'Capybara Gang - Грызи как профи'
  ],
  'Рок': [
    'Capy Rockers - Грызуны на взлёте', 
    'RockCapybara - Водоплавающий рок', 
    'Metal Capys - Болотный драйв'
  ],
  'Поп': [
    'Капи-поп - Солнечный день', 
    'Capy Girls - Звезда танцпола', 
    'Pop Capys - Сладкие грезы'
  ],
  'Техно': [
    'Techno Capys - Ритм джунглей', 
    'DJ Capybara - Технотроника', 
    'CapyTech - Бит болота'
  ],
  'Классика': [
    'Капи-оркестр - Водная симфония', 
    'Классическая капибара - Ноктюрн', 
    'Capy Philharmonic - Соната грызунов'
  ]
};

const CapybaraDJClub = () => {
  const { toast } = useToast();
  const [currentGenre, setCurrentGenre] = useState('Электро');
  const [currentSong, setCurrentSong] = useState(songs['Электро'][0]);
  const [popularity, setPopularity] = useState(50);
  const [gameStarted, setGameStarted] = useState(false);
  const [recentRequests, setRecentRequests] = useState<string[]>([]);
  
  // Обработка запросов от капибар
  const handleRequest = (request: string) => {
    setRecentRequests(prev => {
      const newRequests = [request, ...prev];
      if (newRequests.length > 3) newRequests.pop();
      return newRequests;
    });
    
    toast({
      title: "Новый запрос песни",
      description: request,
      duration: 3000,
    });
  };
  
  // Смена песни
  const changeSong = (genre: string) => {
    setCurrentGenre(genre);
    const songsInGenre = songs[genre as keyof typeof songs];
    const randomSong = songsInGenre[Math.floor(Math.random() * songsInGenre.length)];
    setCurrentSong(randomSong);
    
    toast({
      title: "Смена трека",
      description: `Сейчас играет: ${randomSong}`,
      duration: 3000,
    });
    
    // Эффект на популярность клуба от смены трека
    const popularityChange = Math.floor(Math.random() * 10) - 3; // от -3 до +7
    setPopularity(prev => Math.min(100, Math.max(0, prev + popularityChange)));
  };
  
  // Автоматическая смена песен иногда
  useEffect(() => {
    if (!gameStarted) return;
    
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% шанс смены песни
        const genres = Object.keys(songs);
        const randomGenre = genres[Math.floor(Math.random() * genres.length)];
        changeSong(randomGenre);
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, [gameStarted]);
  
  // Начало игры
  const startGame = () => {
    setGameStarted(true);
    setPopularity(50);
    changeSong('Электро'); // Начинаем с электро
    
    toast({
      title: "DJ Клуб Капибар открыт!",
      description: "Приветствуйте первых посетителей!",
      duration: 5000,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#0F1116] text-white p-4 md:p-8">
      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h1 className="text-5xl font-bold mb-6 text-club-neon">DJ Клуб Капибар</h1>
          <p className="text-xl mb-8 max-w-xl">
            Стань диджеем в самом модном клубе для капибар! Меняй музыку, привлекай посетителей и следи за популярностью заведения.
          </p>
          <div className="mb-10">
            <img 
              src="https://images.unsplash.com/photo-1516342243255-ac2202f9f149?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
              alt="Капибары на вечеринке" 
              className="rounded-xl max-w-md mx-auto opacity-80 shadow-lg"
            />
          </div>
          <Button 
            onClick={startGame}
            className="bg-club-purple hover:bg-club-purple/80 text-white px-8 py-6 text-xl"
          >
            <Icon name="Play" />
            Начать игру
          </Button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-club-neon">DJ Клуб Капибар</h1>
            <Button 
              variant="outline" 
              className="border-club-purple text-white"
              onClick={() => setGameStarted(false)}
            >
              <Icon name="ArrowLeft" />
              Выход
            </Button>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Dancefloor 
                currentSong={currentSong}
                onRequestReceived={handleRequest}
                onPopularityChange={setPopularity}
              />
            </div>
            
            <div className="space-y-6">
              <DJConsole 
                onChangeSong={changeSong}
                currentSong={currentSong}
                popularity={popularity}
              />
              
              <div className="bg-club-dimmed rounded-xl p-4 text-white">
                <h2 className="text-xl font-semibold mb-3">Последние запросы:</h2>
                {recentRequests.length > 0 ? (
                  <ul className="space-y-2">
                    {recentRequests.map((request, index) => (
                      <li key={index} className="flex items-center gap-2 bg-black bg-opacity-30 p-2 rounded">
                        <Icon name="MessageSquare" className="text-club-pink" />
                        {request}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">Пока нет запросов</p>
                )}
              </div>
              
              <div className="bg-club-dimmed rounded-xl p-4 text-white">
                <h2 className="text-xl font-semibold mb-2">Советы диджею:</h2>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Info" className="text-club-neon shrink-0 mt-1" size={16} />
                    <span>Следи за запросами капибар и меняй жанры музыки, чтобы поддерживать интерес</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Info" className="text-club-neon shrink-0 mt-1" size={16} />
                    <span>Альбиносы и самцы капибар более привередливы к музыке</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Info" className="text-club-neon shrink-0 mt-1" size={16} />
                    <span>Эксперименты с разными жанрами привлекают разных посетителей</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CapybaraDJClub;
