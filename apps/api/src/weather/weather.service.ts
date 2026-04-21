import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

import { WeatherCondition } from '@weather-app/types';
import { DailyWeatherConditionResult as DailyWeatherCondition } from './models/daily-weather-condition.model';

import { firstValueFrom } from 'rxjs';

interface OpenMeteoDailyResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    wind_speed_10m_max: number[];
    precipitation_sum: number[];
    uv_index_max: number[];
  };
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    uv_index: number;
  };
}

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  constructor(private readonly httpService: HttpService) {}

  /**
   * Fetch 7-day weather forecast for given coordinates.
   * Returns an array of daily weather conditions with day.
   */
  async get7DayWeatherConditions(
    latitude: number,
    longitude: number,
  ): Promise<DailyWeatherCondition[]> {
    this.logger.log(
      `Fetching 7-day weather for lat: ${latitude}, lon: ${longitude}`,
    );
    const baseUrl = process.env.OPEN_METEO_BASE_URL
      ? process.env.OPEN_METEO_BASE_URL
      : 'https://api.open-meteo.com/v1/forecast';
    try {
      const response = await firstValueFrom(
        this.httpService.get<OpenMeteoDailyResponse>(baseUrl, {
          params: {
            latitude,
            longitude,
            daily: [
              'temperature_2m_max',
              'temperature_2m_min',
              'wind_speed_10m_max',
              'precipitation_sum',
              'uv_index_max',
            ].join(','),
            timezone: 'auto',
          },
        }),
      );
      const data = response.data;
      if (
        !data ||
        typeof data !== 'object' ||
        typeof data.daily !== 'object' ||
        !Array.isArray(data.daily.time)
      ) {
        this.logger.error(
          'Invalid daily weather data from Open-Meteo API',
          JSON.stringify(data),
        );
        throw new Error('Invalid daily weather data from Open-Meteo API');
      }
      // Compose daily weather array
      const days = data.daily.time.length;
      const result: DailyWeatherCondition[] = [];
      for (let i = 0; i < days; i++) {
        result.push({
          day: data.daily.time[i],
          temperature:
            (data.daily.temperature_2m_max[i] +
              data.daily.temperature_2m_min[i]) /
            2,
          windSpeed: data.daily.wind_speed_10m_max[i],
          precipitation: data.daily.precipitation_sum[i],
          uvIndex: data.daily.uv_index_max[i],
        });
      }
      this.logger.log(
        `7-day weather data fetched for lat: ${latitude}, lon: ${longitude}`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        'Error fetching 7-day weather data',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  async getWeatherConditions(
    latitude: number,
    longitude: number,
  ): Promise<WeatherCondition> {
    this.logger.log(`Fetching weather for lat: ${latitude}, lon: ${longitude}`);
    const baseUrl = process.env.OPEN_METEO_BASE_URL
      ? process.env.OPEN_METEO_BASE_URL
      : 'https://api.open-meteo.com/v1/forecast';
    try {
      const response = await firstValueFrom(
        this.httpService.get<OpenMeteoResponse>(baseUrl, {
          params: {
            latitude,
            longitude,
            current: 'temperature_2m,wind_speed_10m,precipitation,uv_index',
          },
        }),
      );
      const data = response.data;
      // Runtime type guard for weather response
      if (
        !data ||
        typeof data !== 'object' ||
        typeof data.current !== 'object' ||
        typeof data.current.temperature_2m !== 'number' ||
        typeof data.current.wind_speed_10m !== 'number' ||
        typeof data.current.precipitation !== 'number' ||
        typeof data.current.uv_index !== 'number'
      ) {
        this.logger.error(
          'Invalid weather data from Open-Meteo API',
          JSON.stringify(data),
        );
        throw new Error('Invalid weather data from Open-Meteo API');
      }
      this.logger.log(
        `Weather data fetched for lat: ${latitude}, lon: ${longitude}`,
      );
      return {
        temperature: data.current.temperature_2m,
        windSpeed: data.current.wind_speed_10m,
        precipitation: data.current.precipitation,
        uvIndex: data.current.uv_index,
      };
    } catch (error) {
      this.logger.error(
        'Error fetching weather data',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }
}
