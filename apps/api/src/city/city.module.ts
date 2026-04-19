import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CityResolver } from './city.resolver';
import { CityService } from './city.service';

@Module({
  imports: [HttpModule],
  providers: [CityService, CityResolver],
  exports: [CityService],
})
export class CityModule {}
