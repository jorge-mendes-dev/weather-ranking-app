import { Module } from '@nestjs/common';
import { WeatherModule } from '../weather/weather.module';
import { RankingResolver } from './ranking.resolver';
import { RankingService } from './ranking.service';

@Module({
  imports: [WeatherModule],
  providers: [RankingResolver, RankingService],
})
export class RankingModule {}
