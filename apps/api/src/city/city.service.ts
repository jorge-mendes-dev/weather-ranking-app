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
    const normalized: string = (name ?? '').toString().trim();
    if (!normalized) {
      this.logger.warn('Empty city name provided to searchCities');
      return [];
    }
    try {
      this.logger.log(`Searching cities for name: ${normalized}`);

      const apiUrl = 'https://geocoding-api.open-meteo.com/v1/search';
      const params = { name: normalized };
      const fullUrl = `${apiUrl}?name=${encodeURIComponent(normalized)}`;
      this.logger.log(`Requesting URL: ${fullUrl}`);
      this.logger.debug(`Request params: ${JSON.stringify(params)}`);

      const response = await firstValueFrom(
        this.httpService.get<GeocodingApiResponse>(apiUrl, {
          params,
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
