import React from 'react';
import { Thermometer, Droplet } from 'lucide-react';
import { StatusType } from '../types';
import { getStatusColor } from '../utils/status';

interface SensorCardProps {
  type: 'temperature' | 'dissolvedOxygen';
  value: number;
  status: StatusType;
  statusText: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ type, value, status, statusText }) => {
  const statusColorClass = getStatusColor(status);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-4 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-4">
        {type === 'temperature' ? (
          <Thermometer className="w-14 h-14 text-blue-400" />
        ) : (
          <Droplet className="w-14 h-14 text-blue-400" />
        )}
        
        <div className="flex-1">
          <div className="flex items-baseline">
            <h3 className="text-2xl font-semibold text-slate-800">
              {type === 'temperature' ? 'Temp: ' : 'DO: '}
            </h3>
            <span className="text-3xl font-bold ml-2 text-slate-800">
              {type === 'temperature' 
                ? `${value}°C` 
                : `${value} mg/L`}
            </span>
          </div>
          
          <p className={`text-xl font-medium ${statusColorClass}`}>
            {statusText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;