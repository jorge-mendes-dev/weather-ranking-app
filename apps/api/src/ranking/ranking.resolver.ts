import { Args, Float, Query, Resolver } from '@nestjs/graphql';
import { ActivityRankingResult } from './models/activity-ranking.model';
import { RankingService } from './ranking.service';

@Resolver()
export class RankingResolver {
  constructor(private readonly rankingService: RankingService) {}

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
    return this.rankingService.getRankings(latitude, longitude);
  }
}
