import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Args, Float, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { DailyWeatherConditionResult } from './models/daily-weather-condition.model';
import { WeatherService } from './weather.service';

@Resolver()
export class WeatherResolver {
  constructor(
    private readonly weatherService: WeatherService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  /**
   * Returns 7-day weather forecast for given coordinates.
   */
  @Query(() => [DailyWeatherConditionResult], { name: 'weather7Day' })
  async get7DayWeather(
    @Args('latitude', { type: () => Float }) latitude: number,
    @Args('longitude', { type: () => Float }) longitude: number,
  ): Promise<DailyWeatherConditionResult[]> {
    const cacheKey = `weather7Day:${latitude.toFixed(4)}:${longitude.toFixed(4)}`;
    const cached =
      await this.cacheManager.get<DailyWeatherConditionResult[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const results = await this.weatherService.get7DayWeatherConditions(
      latitude,
      longitude,
    );
    await this.cacheManager.set(cacheKey, results, 600_000);
    return results;
  }
}
