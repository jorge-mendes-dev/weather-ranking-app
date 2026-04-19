import { Module } from '@nestjs/common';
import { CityModule } from '../city/city.module';
import { WeatherModule } from '../weather/weather.module';
import { RankingResolver } from './ranking.resolver';
import { RankingService } from './ranking.service';

@Module({
  imports: [WeatherModule, CityModule],
  providers: [RankingResolver, RankingService],
})
export class RankingModule {}
