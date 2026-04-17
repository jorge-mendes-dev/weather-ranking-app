import { SportActivity } from '@weather-app/types';

export interface ScoringThresholds {
  idealTempMin: number;
  idealTempMax: number;
  maxWind: number; // km/h
  maxPrecipitation: number; // mm
  minUvIndex: number;
  maxUvIndex: number;
}

export const SCORING_THRESHOLDS: Record<SportActivity, ScoringThresholds> = {
  surfing: {
    idealTempMin: 20,
    idealTempMax: 32,
    maxWind: 40,
    maxPrecipitation: 2,
    minUvIndex: 2,
    maxUvIndex: 10,
  },
  skiing: {
    idealTempMin: -15,
    idealTempMax: 2,
    maxWind: 30,
    maxPrecipitation: 5,
    minUvIndex: 0,
    maxUvIndex: 6,
  },
  hiking: {
    idealTempMin: 10,
    idealTempMax: 25,
    maxWind: 25,
    maxPrecipitation: 1,
    minUvIndex: 1,
    maxUvIndex: 7,
  },
  cycling: {
    idealTempMin: 15,
    idealTempMax: 28,
    maxWind: 20,
    maxPrecipitation: 1,
    minUvIndex: 1,
    maxUvIndex: 8,
  },
  running: {
    idealTempMin: 8,
    idealTempMax: 22,
    maxWind: 20,
    maxPrecipitation: 1,
    minUvIndex: 0,
    maxUvIndex: 8,
  },
};
