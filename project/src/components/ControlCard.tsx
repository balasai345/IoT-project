import React from 'react';
import { RefreshCw, Wind } from 'lucide-react';

interface ControlCardProps {
  type: 'pump' | 'aerator';
  isActive: boolean;
}

const ControlCard: React.FC<ControlCardProps> = ({ type, isActive }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 flex-1">
      <div className="flex flex-col items-center justify-center h-full">
        {type === 'pump' ? (
          <RefreshCw className="w-10 h-10 text-slate-600 mb-2" />
        ) : (
          <Wind className="w-10 h-10 text-teal-500 mb-2" />
        )}
        
        <h3 className="text-xl font-semibold text-slate-800">
          {type === 'pump' ? 'Pump:' : 'Aerator'}
        </h3>
        
        <p className={`text-lg font-bold ${
          isActive ? 'text-green-500' : 'text-slate-500'
        }`}>
          {isActive ? 'ON' : 'OFF'}
        </p>
      </div>
    </div>
  );
};

export default ControlCard;