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

  constructor(
    day: string,
    temperature: number,
    windSpeed: number,
    precipitation: number,
    uvIndex: number,
  ) {
    this.day = day;
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.precipitation = precipitation;
    this.uvIndex = uvIndex;
  }
}
