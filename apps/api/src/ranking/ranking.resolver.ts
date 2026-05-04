import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Args, Float, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { ActivityRankingResult } from './models/activity-ranking.model';
import { RankingService } from './ranking.service';

@Resolver()
export class RankingResolver {
  constructor(
    private readonly rankingService: RankingService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Query(() => [ActivityRankingResult], {
    description:
      'Returns sport activities ranked by weather suitability for the given coordinates',
  })
  async rankings(
    @Args('latitude', {
      type: () => Float,
      description: 'Latitude (-90 to 90)',
    })
    latitude: number,
    @Args('longitude', {
      type: () => Float,
      description: 'Longitude (-180 to 180)',
    })
    longitude: number,
  ): Promise<ActivityRankingResult[]> {
    const cacheKey = `ranking:${latitude.toFixed(4)}:${longitude.toFixed(4)}`;
    const cached =
      await this.cacheManager.get<ActivityRankingResult[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const results = await this.rankingService.getRankings(latitude, longitude);
    await this.cacheManager.set(cacheKey, results, 600_000);
    return results;
  }
}
