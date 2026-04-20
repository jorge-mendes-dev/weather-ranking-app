export type SportActivity = 'surfing' | 'skiing' | 'hiking' | 'cycling' | 'running';

export interface WeatherCondition {
  temperature: number; // Celsius
  windSpeed: number;   // km/h
  precipitation: number; // mm
  uvIndex: number;
}

export interface ActivityRanking {
  activity: SportActivity;
  score: number; // 0–100
  conditions: WeatherCondition;
}

export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export interface Weather7Day {
  day: string;
  temperature: number;
  windSpeed: number;
  precipitation: number;
  uvIndex: number;
}