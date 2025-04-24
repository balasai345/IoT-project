import { SensorData, ThingSpeakResponse } from '../types';

// Replace with your ThingSpeak channel and API key
const CHANNEL_ID = '12345';
const API_KEY = 'YOURAPIKEY';

export const fetchSensorData = async (): Promise<SensorData> => {
  try {
    // For development, return mock data
    if (process.env.NODE_ENV === 'development') {
      return getMockData();
    }
    
    const response = await fetch(
      `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY}&results=1`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from ThingSpeak');
    }
    
    const data: ThingSpeakResponse = await response.json();
    
    if (data.feeds && data.feeds.length > 0) {
      const latestData = data.feeds[0];
      
      return {
        temperature: parseFloat(latestData.field1),
        dissolvedOxygen: parseFloat(latestData.field2),
        pumpStatus: latestData.field3 === '1',
        aeratorStatus: latestData.field4 === '1',
      };
    }
    
    throw new Error('No data available from ThingSpeak');
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    // Return mock data as fallback
    return getMockData();
  }
};

// Mock data for development and testing
const getMockData = (): SensorData => {
  return {
    temperature: 27.8,
    dissolvedOxygen: 3.5,
    pumpStatus: false,
    aeratorStatus: true,
  };
};