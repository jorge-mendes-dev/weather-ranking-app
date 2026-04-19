import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
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
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of({ data: mockData }));
    const result = await service.getWeatherConditions(10, 20);
    expect(result).toEqual({
      temperature: 22,
      windSpeed: 5,
      precipitation: 0,
      uvIndex: 6,
    });
  });

  it('should throw error for invalid response', async () => {
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of({ data: {} }));
    await expect(service.getWeatherConditions(10, 20)).rejects.toThrow(
      'Invalid weather data from Open-Meteo API',
    );
  });
});
