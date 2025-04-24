import { StatusConfig, StatusType } from '../types';

// Configuration for determining status based on sensor values
export const statusConfig: StatusConfig = {
  temperature: {
    normal: [24, 30], // Normal range for temperature
    warning: [[20, 24], [30, 35]], // Warning ranges
  },
  dissolvedOxygen: {
    normal: [5, 12], // Normal range for DO
    warning: [[3.5, 5], [12, 15]], // Warning ranges
  },
};

export const getTemperatureStatus = (value: number): StatusType => {
  const { normal, warning } = statusConfig.temperature;
  
  if (value >= normal[0] && value <= normal[1]) {
    return 'normal';
  }
  
  for (const [min, max] of warning) {
    if (value >= min && value <= max) {
      return 'warning';
    }
  }
  
  return 'critical';
};

export const getDissolvedOxygenStatus = (value: number): StatusType => {
  const { normal, warning } = statusConfig.dissolvedOxygen;
  
  if (value >= normal[0] && value <= normal[1]) {
    return 'normal';
  }
  
  for (const [min, max] of warning) {
    if (value >= min && value <= max) {
      return 'warning';
    }
  }
  
  return 'critical';
};

export const getStatusText = (type: string, status: StatusType): string => {
  if (type === 'temperature') {
    if (status === 'normal') return 'Normal';
    if (status === 'warning') return 'Warning';
    return 'Critical';
  }
  
  if (type === 'dissolvedOxygen') {
    if (status === 'normal') return 'Normal';
    if (status === 'warning') return 'Low';
    return 'Critical';
  }
  
  return '';
};

export const getStatusColor = (status: StatusType): string => {
  switch (status) {
    case 'normal':
      return 'text-green-500';
    case 'warning':
      return 'text-orange-500';
    case 'critical':
      return 'text-red-600';
    default:
      return 'text-gray-500';
  }
};