import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Wind, Save, AlertTriangle } from 'lucide-react';

const ControlPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [pumpStatus, setPumpStatus] = useState<boolean>(false);
  const [aeratorStatus, setAeratorStatus] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  
  // In a full implementation, this would send control commands to your IoT platform
  const saveChanges = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      alert('Settings saved! In a real app, this would update your actual devices.');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-md mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 mb-4 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Dashboard
        </button>
        
        <h1 className="text-2xl font-bold mb-6 text-slate-800">Manual Control</h1>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-md mb-6">
          <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-amber-800 text-sm">
                Changes made here will directly affect your equipment. Use with caution.
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800">
              <RefreshCw className="w-6 h-6 mr-2 text-slate-600" />
              Water Pump
            </h2>
            
            <div className="flex items-center mb-4">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={pumpStatus}
                  onChange={() => setPumpStatus(!pumpStatus)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">
                  {pumpStatus ? 'ON' : 'OFF'}
                </span>
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800">
              <Wind className="w-6 h-6 mr-2 text-teal-500" />
              Aerator
            </h2>
            
            <div className="flex items-center mb-4">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={aeratorStatus}
                  onChange={() => setAeratorStatus(!aeratorStatus)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">
                  {aeratorStatus ? 'ON' : 'OFF'}
                </span>
              </label>
            </div>
          </div>
          
          <button
            onClick={saveChanges}
            disabled={saving}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {saving ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;