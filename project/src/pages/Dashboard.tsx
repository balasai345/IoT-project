import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SensorData } from '../types';
import { fetchSensorData } from '../services/thingSpeakService';
import { getTemperatureStatus, getDissolvedOxygenStatus, getStatusText } from '../utils/status';
import SensorCard from '../components/SensorCard';
import ControlCard from '../components/ControlCard';
import NavigationCard from '../components/NavigationCard';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchSensorData();
      setSensorData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load sensor data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    const intervalId = setInterval(() => {
      loadData();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading && !sensorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Header />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-10 w-10 bg-blue-400 rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-slate-600">Loading sensor data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !sensorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Header />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="bg-red-100 p-6 rounded-lg border border-red-300">
            <p className="text-red-600 font-medium">{error}</p>
            <button 
              onClick={loadData}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const data = sensorData || {
    temperature: 0,
    dissolvedOxygen: 0,
    pumpStatus: false,
    aeratorStatus: false,
  };

  const temperatureStatus = getTemperatureStatus(data.temperature);
  const doStatus = getDissolvedOxygenStatus(data.dissolvedOxygen);

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/2860705/pexels-photo-2860705.jpeg?auto=compress&cs=tinysrgb&w=1920")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="relative">
        <Header />
        
        <main className="p-4 max-w-md mx-auto">
          <div className="backdrop-blur-md bg-white/90 p-6 rounded-xl shadow-xl mb-6">
            <SensorCard 
              type="temperature"
              value={data.temperature}
              status={temperatureStatus}
              statusText={getStatusText('temperature', temperatureStatus)}
            />
            
            <SensorCard 
              type="dissolvedOxygen"
              value={data.dissolvedOxygen}
              status={doStatus}
              statusText={getStatusText('dissolvedOxygen', doStatus)}
            />
            
            <div className="flex gap-4 mb-4">
              <ControlCard type="pump" isActive={data.pumpStatus} />
              <ControlCard type="aerator" isActive={data.aeratorStatus} />
            </div>
            
            <div className="flex gap-4">
              <NavigationCard type="graphs" onClick={() => navigate('/graphs')} />
              <NavigationCard type="control" onClick={() => navigate('/control')} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;