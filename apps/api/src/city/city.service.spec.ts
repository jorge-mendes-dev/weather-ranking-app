import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CityService],
    }).compile();

    service = module.get<CityService>(CityService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return city results on success', async () => {
    const mockResponse: AxiosResponse = {
      data: {
        results: [
          {
            name: 'London',
            country: 'UK',
            latitude: 51.5074,
            longitude: -0.1278,
          },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new AxiosHeaders() },
    };
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));
    const result = await service.searchCities('London');
    expect(result).toEqual([
      {
        name: 'London',
        country: 'UK',
        latitude: 51.5074,
        longitude: -0.1278,
      },
    ]);
  });

  it('should return empty array if no results', async () => {
    const mockResponse: AxiosResponse = {
      data: { results: [] },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new AxiosHeaders() },
    };
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));
    const result = await service.searchCities('Unknown');
    expect(result).toEqual([]);
  });

  it('should return empty array on error', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(() => new Error('API error')));
    const result = await service.searchCities('ErrorCity');
    expect(result).toEqual([]);
  });

  it('should return empty array for empty input', async () => {
    const result = await service.searchCities('');
    expect(result).toEqual([]);
  });
});
