import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CityModule } from './city/city.module';
import { RankingModule } from './ranking/ranking.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    WeatherModule,
    CityModule,
    RankingModule,
  ],
})
export class AppModule {}
