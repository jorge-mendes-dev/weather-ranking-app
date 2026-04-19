import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { WeatherService } from './weather.service';

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
});
