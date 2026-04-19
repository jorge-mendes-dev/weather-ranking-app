import { Args, Float, Query, Resolver } from '@nestjs/graphql';
import { DailyWeatherConditionResult } from './models/daily-weather-condition.model';
import { WeatherService } from './weather.service';

@Resolver()
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  /**
   * Returns 7-day weather forecast for given coordinates.
   */
  @Query(() => [DailyWeatherConditionResult], { name: 'weather7Day' })
  async get7DayWeather(
    @Args('latitude', { type: () => Float }) latitude: number,
    @Args('longitude', { type: () => Float }) longitude: number,
  ): Promise<DailyWeatherConditionResult[]> {
    return this.weatherService.get7DayWeatherConditions(latitude, longitude);
  }
}
