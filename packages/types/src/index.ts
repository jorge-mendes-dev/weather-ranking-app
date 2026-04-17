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
