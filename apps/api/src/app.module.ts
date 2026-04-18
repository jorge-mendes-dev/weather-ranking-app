import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RankingModule } from './ranking/ranking.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    WeatherModule,
    RankingModule,
  ],
})
export class AppModule {}
