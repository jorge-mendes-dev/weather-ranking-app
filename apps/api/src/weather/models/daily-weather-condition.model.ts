import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DailyWeatherConditionResult {
  @Field(() => String, { description: 'Day in YYYY-MM-DD format' })
  day: string;

  @Field(() => Float, { description: 'Average temperature in Celsius' })
  temperature: number;

  @Field(() => Float, { description: 'Max wind speed in km/h' })
  windSpeed: number;

  @Field(() => Float, { description: 'Total precipitation in mm' })
  precipitation: number;

  @Field(() => Float, { description: 'Max UV index' })
  uvIndex: number;
}