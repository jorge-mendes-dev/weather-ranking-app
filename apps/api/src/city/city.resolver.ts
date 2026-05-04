import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { CityService } from './city.service';
import { CityResult } from './models/city.model';

@Resolver()
export class CityResolver {
  constructor(
    private readonly cityService: CityService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Query(() => [CityResult], {
    description: 'Search for cities by name using Open-Meteo geocoding API',
  })
  async searchCities(
    @Args('name', { type: () => String }) name: string,
  ): Promise<CityResult[]> {
    const cacheKey = `city:search:${name.trim().toLowerCase()}`;
    const cached = await this.cacheManager.get<CityResult[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const results = await this.cityService.searchCities(name);
    await this.cacheManager.set(cacheKey, results, 300_000);
    return results;
  }
}
