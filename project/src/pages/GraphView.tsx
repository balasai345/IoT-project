import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const GraphView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // In a complete implementation, we would fetch historical data from ThingSpeak
  // and use a charting library like Chart.js or Recharts to render graphs
  
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 mb-4 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Dashboard
        </button>
        
        <h1 className="text-2xl font-bold mb-6 text-slate-800">Sensor Data History</h1>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Temperature History</h2>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
            <p className="text-gray-500">Temperature graph would be displayed here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Dissolved Oxygen History</h2>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
            <p className="text-gray-500">Dissolved oxygen graph would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphView;