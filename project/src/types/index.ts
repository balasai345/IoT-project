export interface SensorData {
  temperature: number;
  dissolvedOxygen: number;
  pumpStatus: boolean;
  aeratorStatus: boolean;
}

export interface ThingSpeakResponse {
  feeds: {
    field1: string; // temperature
    field2: string; // dissolved oxygen
    field3: string; // pump status (0/1)
    field4: string; // aerator status (0/1)
    created_at: string;
  }[];
}

export type StatusType = 'normal' | 'warning' | 'critical';

export interface StatusConfig {
  temperature: {
    normal: [number, number];
    warning: [number, number][];
  };
  dissolvedOxygen: {
    normal: [number, number];
    warning: [number, number][];
  };
}