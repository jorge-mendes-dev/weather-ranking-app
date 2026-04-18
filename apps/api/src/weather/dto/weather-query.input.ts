import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';

@InputType()
export class WeatherQueryInput {
  @Field(() => Float, { description: 'Latitude between -90 and 90' })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @Field(() => Float, { description: 'Longitude between -180 and 180' })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}
