import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { WeatherCondition } from '@weather-app/types';

import { firstValueFrom } from 'rxjs';

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
  constructor(private readonly httpService: HttpService) {}

  async getWeatherConditions(
    latitude: number,
    longitude: number,
  ): Promise<WeatherCondition> {
    const baseUrl = process.env.OPEN_METEO_BASE_URL
      ? process.env.OPEN_METEO_BASE_URL + 'forecast'
      : 'https://api.open-meteo.com/v1/forecast';
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
      throw new Error('Invalid weather data from Open-Meteo API');
    }
    return {
      temperature: data.current.temperature_2m,
      windSpeed: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
      uvIndex: data.current.uv_index,
    };
  }
}
