import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { CityService } from './../src/city/city.service';
import { ActivityRankingResult } from './../src/ranking/models/activity-ranking.model';
import { RankingService } from './../src/ranking/ranking.service';
import { DailyWeatherConditionResult } from './../src/weather/models/daily-weather-condition.model';
import { WeatherService } from './../src/weather/weather.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // Mock data for weather
  const mockWeatherData: DailyWeatherConditionResult[] = [
    {
      day: '2026-04-29',
      temperature: 20,
      windSpeed: 10,
      precipitation: 0,
      uvIndex: 6,
    },
    {
      day: '2026-04-30',
      temperature: 22,
      windSpeed: 8,
      precipitation: 1,
      uvIndex: 7,
    },
  ];

  const mockWeatherService = {
    get7DayWeatherConditions: jest.fn().mockResolvedValue(mockWeatherData),
  };

  const mockCityData = [
    {
      name: 'Lisbon',
      country: 'Portugal',
      latitude: 38.7167,
      longitude: -9.1333,
    },
  ];

  const mockCityService = {
    searchCities: jest.fn().mockResolvedValue(mockCityData),
  };

  const mockRankingData: ActivityRankingResult[] = [
    {
      day: '2026-04-29',
      activity: 'surfing',
      score: 90,
      conditions: {
        temperature: 20,
        windSpeed: 10,
        precipitation: 0,
        uvIndex: 6,
      },
    },
  ];

  const mockRankingService = {
    getRankings: jest.fn().mockResolvedValue(mockRankingData),
  };

  function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  async function postGraphql<T>(query: string): Promise<T> {
    const response = await request(app.getHttpServer() as App)
      .post('/graphql')
      .send({ query })
      .expect(200);

    const responseBody: unknown = response.body;
    if (!isRecord(responseBody)) {
      throw new Error('GraphQL response body is not an object');
    }

    const errors = responseBody.errors;
    if (Array.isArray(errors) && errors.length > 0) {
      throw new Error(`GraphQL returned errors: ${JSON.stringify(errors)}`);
    }

    const data = responseBody.data;
    if (!isRecord(data)) {
      throw new Error('GraphQL response is missing data');
    }

    return data as T;
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(WeatherService)
      .useValue(mockWeatherService)
      .overrideProvider(CityService)
      .useValue(mockCityService)
      .overrideProvider(RankingService)
      .useValue(mockRankingService)
      .compile();

    jest.clearAllMocks();
    mockWeatherService.get7DayWeatherConditions.mockResolvedValue(
      mockWeatherData,
    );
    mockCityService.searchCities.mockResolvedValue(mockCityData);
    mockRankingService.getRankings.mockResolvedValue(mockRankingData);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer() as App)
      .get('/')
      .expect(200)
      .expect({
        message:
          'Weather Ranking API is live and working. This is a GraphQL API. Please use the /graphql endpoint to interact with it.',
      });
  });

  it('GraphQL: weather7Day query returns mocked data', async () => {
    const query = `{
      weather7Day(latitude: 38.7167, longitude: -9.1333) {
        day
        temperature
        windSpeed
        precipitation
        uvIndex
      }
    }`;
    const data = await postGraphql<{
      weather7Day: DailyWeatherConditionResult[];
    }>(query);
    expect(data.weather7Day).toEqual(mockWeatherData);
  });

  it('GraphQL: rankings query returns deterministic data', async () => {
    const query = `{
      rankings(latitude: 38.7167, longitude: -9.1333) {
        day
        activity
        score
        conditions {
          temperature
          windSpeed
          precipitation
          uvIndex
        }
      }
    }`;
    const data = await postGraphql<{ rankings: ActivityRankingResult[] }>(
      query,
    );
    expect(data.rankings.length).toBeGreaterThan(0);
    expect(data.rankings).toEqual(mockRankingData);
  });

  it('GraphQL cache: weather7Day caches same args and bypasses for different args', async () => {
    const sameArgsQuery = `{
      weather7Day(latitude: 38.7167, longitude: -9.1333) {
        day
        temperature
        windSpeed
        precipitation
        uvIndex
      }
    }`;

    const differentArgsQuery = `{
      weather7Day(latitude: 39.0000, longitude: -9.1333) {
        day
        temperature
        windSpeed
        precipitation
        uvIndex
      }
    }`;

    await postGraphql<{ weather7Day: DailyWeatherConditionResult[] }>(
      sameArgsQuery,
    );
    await postGraphql<{ weather7Day: DailyWeatherConditionResult[] }>(
      sameArgsQuery,
    );
    expect(mockWeatherService.get7DayWeatherConditions).toHaveBeenCalledTimes(
      1,
    );

    await postGraphql<{ weather7Day: DailyWeatherConditionResult[] }>(
      differentArgsQuery,
    );
    expect(mockWeatherService.get7DayWeatherConditions).toHaveBeenCalledTimes(
      2,
    );
  });

  it('GraphQL cache: city search normalizes key by trim/lowercase', async () => {
    const mixedCaseQuery = `{
      searchCities(name: "Lisbon") {
        name
        country
        latitude
        longitude
      }
    }`;

    const normalizedQuery = `{
      searchCities(name: " lisbon ") {
        name
        country
        latitude
        longitude
      }
    }`;

    await postGraphql<{ searchCities: typeof mockCityData }>(mixedCaseQuery);
    await postGraphql<{ searchCities: typeof mockCityData }>(normalizedQuery);
    expect(mockCityService.searchCities).toHaveBeenCalledTimes(1);
  });

  it('GraphQL cache: rankings caches by coordinates', async () => {
    const sameArgsQuery = `{
      rankings(latitude: 38.7167, longitude: -9.1333) {
        day
        activity
        score
      }
    }`;

    const differentArgsQuery = `{
      rankings(latitude: 38.8000, longitude: -9.1333) {
        day
        activity
        score
      }
    }`;

    await postGraphql<{ rankings: ActivityRankingResult[] }>(sameArgsQuery);
    await postGraphql<{ rankings: ActivityRankingResult[] }>(sameArgsQuery);
    expect(mockRankingService.getRankings).toHaveBeenCalledTimes(1);

    await postGraphql<{ rankings: ActivityRankingResult[] }>(
      differentArgsQuery,
    );
    expect(mockRankingService.getRankings).toHaveBeenCalledTimes(2);
  });
});
