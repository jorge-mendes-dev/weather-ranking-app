import { Resolver } from '@nestjs/graphql';
import { WeatherService } from './weather.service';

@Resolver()
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}
}
