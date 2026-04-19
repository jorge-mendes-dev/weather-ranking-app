import { Args, Query, Resolver } from '@nestjs/graphql';
import { CityService } from './city.service';
import { CityResult } from './models/city.model';

@Resolver()
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => [CityResult], {
    description: 'Search for cities by name using Open-Meteo geocoding API',
  })
  async searchCities(
    @Args('name', { type: () => String }) name: string,
  ): Promise<CityResult[]> {
    return this.cityService.searchCities(name);
  }
}
