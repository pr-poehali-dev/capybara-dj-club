
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] to-[#0F1116] p-4">
      <div className="text-center max-w-xl">
        <div className="mb-6">
          <img 
            src="https://images.unsplash.com/photo-1557431177-36141475c676?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Капибара диджей" 
            className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-[#9b87f5]"
          />
        </div>
        <h1 className="text-5xl font-bold mb-6 text-white">DJ Клуб Капибар</h1>
        <p className="text-xl mb-8 text-gray-300">
          Добро пожаловать в уникальную игру, где ты станешь диджеем в клубе для капибар! 
          Крути треки, исполняй пожелания пушистых посетителей и стань легендой ночной жизни!
        </p>
        <div className="space-y-4">
          <Link to="/dj-club">
            <Button className="bg-[#9b87f5] hover:bg-[#6E59A5] text-white px-8 py-6 text-xl">
              <Icon name="Play" />
              Начать игру
            </Button>
          </Link>
          <div className="text-gray-400 mt-4 text-sm">
            Разработано с любовью к капибарам и музыке 🎧
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
