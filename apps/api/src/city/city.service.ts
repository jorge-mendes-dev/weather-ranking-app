import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(CityService.name);
  constructor(private readonly httpService: HttpService) {}

  async searchCities(name: string): Promise<CityResult[]> {
    const normalized: string = (name ?? '').toString().trim().toLowerCase();
    if (!normalized) {
      this.logger.warn('Empty city name provided to searchCities');
      return [];
    }
    const baseUrl = process.env.OPEN_METEO_BASE_URL
      ? process.env.OPEN_METEO_BASE_URL + 'search'
      : 'https://geocoding-api.open-meteo.com/v1/search';
    try {
      this.logger.log(`Searching cities for name: ${normalized}`);
      const response = await firstValueFrom(
        this.httpService.get<GeocodingApiResponse>(baseUrl, {
          params: { name: normalized },
        }),
      );
      const results =
        response.data.results?.map((r) => ({
          name: r.name,
          country: r.country,
          latitude: r.latitude,
          longitude: r.longitude,
        })) ?? [];
      this.logger.log(`Found ${results.length} cities for name: ${normalized}`);
      return results;
    } catch (error) {
      this.logger.error(
        'Error searching cities',
        error instanceof Error ? error.stack : String(error),
      );
      return [];
    }
  }
}
