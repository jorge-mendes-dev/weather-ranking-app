export type SportActivity = 'surfing' | 'skiing' | 'hiking' | 'cycling' | 'running';

export interface RankingConditions {
  temperature: number;
  windSpeed: number;
  precipitation: number;
  uvIndex: number;
}

export interface Ranking {
  day: string;
  activity: string;
  score: number;
  conditions: RankingConditions;
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