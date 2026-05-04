import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { CityModule } from './city/city.module';
import { RankingModule } from './ranking/ranking.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    CacheModule.register({ isGlobal: true }),
    WeatherModule,
    CityModule,
    RankingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
