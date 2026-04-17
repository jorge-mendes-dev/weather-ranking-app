import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WeatherConditionResult {
  @Field(() => Float, { description: 'Temperature in Celsius' })
  temperature: number;

  @Field(() => Float, { description: 'Wind speed in km/h' })
  windSpeed: number;

  @Field(() => Float, { description: 'Precipitation in mm' })
  precipitation: number;

  @Field(() => Float, { description: 'UV index' })
  uvIndex: number;
}
