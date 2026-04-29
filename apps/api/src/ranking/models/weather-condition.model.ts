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

  constructor(
    temperature: number,
    windSpeed: number,
    precipitation: number,
    uvIndex: number,
  ) {
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.precipitation = precipitation;
    this.uvIndex = uvIndex;
  }
}
