import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WeatherResolver } from './weather.resolver';
import { WeatherService } from './weather.service';
@Module({
  imports: [HttpModule],
  providers: [WeatherService, WeatherResolver],
  exports: [WeatherService],
})
export class WeatherModule {}
