import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { WeatherService } from './weather.service';

beforeAll(() => {
  jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});
  jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => {});
  jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
});
afterAll(() => {
  jest.restoreAllMocks();
});

describe('WeatherService', () => {
  let service: WeatherService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return weather conditions for valid response', async () => {
    const mockData = {
      current: {
        temperature_2m: 22,
        wind_speed_10m: 5,
        precipitation: 0,
        uv_index: 6,
      },
    };
    const mockResponse: AxiosResponse = {
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new AxiosHeaders() },
    };
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));
    const result = await service.getWeatherConditions(10, 20);
    expect(result).toEqual({
      temperature: 22,
      windSpeed: 5,
      precipitation: 0,
      uvIndex: 6,
    });
  });

  it('should throw error for invalid response', async () => {
    const mockResponse: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new AxiosHeaders() },
    };
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));
    await expect(service.getWeatherConditions(10, 20)).rejects.toThrow(
      'Invalid weather data from Open-Meteo API',
    );
  });
  it('should return 7-day weather conditions for valid response', async () => {
    const mockData = {
      daily: {
        time: [
          '2026-04-19',
          '2026-04-20',
          '2026-04-21',
          '2026-04-22',
          '2026-04-23',
          '2026-04-24',
          '2026-04-25',
        ],
        temperature_2m_max: [20, 21, 22, 23, 24, 25, 26],
        temperature_2m_min: [10, 11, 12, 13, 14, 15, 16],
        wind_speed_10m_max: [5, 6, 7, 8, 9, 10, 11],
        precipitation_sum: [0, 1, 0, 2, 0, 1, 0],
        uv_index_max: [6, 7, 8, 9, 10, 11, 12],
      },
    };
    const mockResponse: AxiosResponse = {
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new AxiosHeaders() },
    };
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));
    const result = await service.get7DayWeatherConditions(10, 20);
    expect(result).toHaveLength(7);
    expect(result[0]).toEqual({
      day: '2026-04-19',
      temperature: 15,
      windSpeed: 5,
      precipitation: 0,
      uvIndex: 6,
    });
    expect(result[6]).toEqual({
      day: '2026-04-25',
      temperature: 21,
      windSpeed: 11,
      precipitation: 0,
      uvIndex: 12,
    });
  });

  it('should throw error for invalid 7-day response', async () => {
    const mockResponse: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new AxiosHeaders() },
    };
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));
    await expect(service.get7DayWeatherConditions(10, 20)).rejects.toThrow(
      'Invalid daily weather data from Open-Meteo API',
    );
  });
});
