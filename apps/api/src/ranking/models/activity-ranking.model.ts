import { Field, Float, ObjectType } from '@nestjs/graphql';
import { WeatherConditionResult } from './weather-condition.model';

@ObjectType()
export class ActivityRankingResult {
  @Field(() => String, { description: 'Sport activity name' })
  activity: string;

  @Field(() => Float, { description: 'Suitability score from 0 to 100' })
  score: number;

  @Field(() => WeatherConditionResult)
  conditions: WeatherConditionResult;
}
