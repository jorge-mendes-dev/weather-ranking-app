import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CityResult {
  @Field(() => String)
  name: string;

  @Field(() => String)
  country: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  constructor(
    name: string,
    country: string,
    latitude: number,
    longitude: number,
  ) {
    this.name = name;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
