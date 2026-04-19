import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CityResult } from './models/city.model';

interface GeocodingApiResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface GeocodingApiResponse {
  results?: GeocodingApiResult[];
}

@Injectable()
export class CityService {
  constructor(private readonly httpService: HttpService) {}

  async searchCities(name: string): Promise<CityResult[]> {
    const normalized: string = (name ?? '').toString().trim().toLowerCase();
    if (!normalized) return [];
    try {
      const response = await firstValueFrom(
        this.httpService.get<GeocodingApiResponse>(
          'https://geocoding-api.open-meteo.com/v1/search',
          {
            params: { name: normalized },
          },
        ),
      );
      return (
        response.data.results?.map((r) => ({
          name: r.name,
          country: r.country,
          latitude: r.latitude,
          longitude: r.longitude,
        })) ?? []
      );
    } catch {
      return [];
    }
  }
}
