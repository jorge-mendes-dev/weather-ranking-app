import { Field, Float, ObjectType } from '@nestjs/graphql';
import { WeatherConditionResult } from './weather-condition.model';

@ObjectType()
export class ActivityRankingResult {
  @Field(() => String, { description: 'Day in YYYY-MM-DD format' })
  day: string;

  @Field(() => String, { description: 'Sport activity name' })
  activity: string;

  @Field(() => Float, { description: 'Suitability score from 0 to 100' })
  score: number;

  @Field(() => WeatherConditionResult)
  conditions: WeatherConditionResult;

  constructor(
    day: string,
    activity: string,
    score: number,
    conditions: WeatherConditionResult,
  ) {
    this.day = day;
    this.activity = activity;
    this.score = score;
    this.conditions = conditions;
  }
}
