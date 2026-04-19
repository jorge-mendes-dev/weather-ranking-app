import { Injectable, Logger } from '@nestjs/common';
import {
  ActivityRanking,
  SportActivity,
  WeatherCondition,
} from '@weather-app/types';
import { SCORING_THRESHOLDS } from '../common/constants/scoring.constants';
import { WeatherService } from '../weather/weather.service';

const ACTIVITIES: SportActivity[] = [
  'surfing',
  'skiing',
  'hiking',
  'cycling',
  'running',
];

@Injectable()
export class RankingService {
  private readonly logger = new Logger(RankingService.name);
  constructor(private readonly weatherService: WeatherService) {}

  async getRankings(
    latitude: number,
    longitude: number,
  ): Promise<ActivityRanking[]> {
    this.logger.log(`Getting rankings for lat: ${latitude}, lon: ${longitude}`);
    const conditions = await this.weatherService.getWeatherConditions(
      latitude,
      longitude,
    );
    const rankings = ACTIVITIES.map((activity) => ({
      activity,
      score: this.score(activity, conditions),
      conditions,
    })).sort((a, b) => b.score - a.score);
    this.logger.log(`Rankings calculated for lat: ${latitude}, lon: ${longitude}`);
    return rankings;
  }

  private score(activity: SportActivity, w: WeatherCondition): number {
    const t = SCORING_THRESHOLDS[activity];
    let points = 100;

    // Temperature penalty — proportional distance outside ideal range
    if (w.temperature < t.idealTempMin) {
      points -= Math.min(50, (t.idealTempMin - w.temperature) * 3);
    } else if (w.temperature > t.idealTempMax) {
      points -= Math.min(50, (w.temperature - t.idealTempMax) * 3);
    }

    // Wind penalty — proportional excess above threshold
    if (w.windSpeed > t.maxWind) {
      points -= Math.min(30, (w.windSpeed - t.maxWind) * 2);
    }

    // Precipitation penalty — proportional excess above threshold
    if (w.precipitation > t.maxPrecipitation) {
      points -= Math.min(30, (w.precipitation - t.maxPrecipitation) * 5);
    }

    // UV index flat penalty when outside acceptable range
    if (w.uvIndex < t.minUvIndex || w.uvIndex > t.maxUvIndex) {
      points -= 10;
    }

    return Math.max(0, Math.round(points));
  }
}
