import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { WeatherCondition } from '@weather-app/types';
import { firstValueFrom } from 'rxjs';

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

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
    const { data } = await firstValueFrom(
      this.httpService.get<OpenMeteoResponse>(OPEN_METEO_BASE_URL, {
        params: {
          latitude,
          longitude,
          current: 'temperature_2m,wind_speed_10m,precipitation,uv_index',
        },
      }),
    );

    return {
      temperature: data.current.temperature_2m,
      windSpeed: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
      uvIndex: data.current.uv_index,
    };
  }
}
