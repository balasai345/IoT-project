import React from 'react';
import { LineChart, Settings, Bell } from 'lucide-react';

interface NavigationCardProps {
  type: 'graphs' | 'control';
  onClick: () => void;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ type, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 flex-1"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center h-full py-2">
        {type === 'graphs' ? (
          <LineChart className="w-10 h-10 text-teal-500 mb-2" />
        ) : (
          <div className="flex">
            <Settings className="w-10 h-10 text-slate-600" />
            <Bell className="w-8 h-8 text-amber-500 -ml-2" />
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-center text-slate-800 mt-2">
          {type === 'graphs' ? 'View Graphs' : 'Manual Control'}
        </h3>
      </div>
    </div>
  );
};

export default NavigationCard;