import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { WeatherService } from './../src/weather/weather.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  // Mock data for weather
  const mockWeatherData = [
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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(WeatherService)
      .useValue(mockWeatherService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
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
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });
    expect(res.body.data.weather7Day).toEqual(mockWeatherData);
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
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });
    // Should return rankings for each activity for each day in mockWeatherData
    expect(res.body.data.rankings.length).toBeGreaterThan(0);
    // Check that all returned days are in mockWeatherData
    const days = mockWeatherData.map((d) => d.day);
    for (const r of res.body.data.rankings) {
      expect(days).toContain(r.day);
      expect(r.conditions).toBeDefined();
    }
  });
});
