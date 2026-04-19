import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from '../weather/weather.service';
import { RankingService } from './ranking.service';

const mockWeatherService = {
  getWeatherConditions: jest.fn(),
};

describe('RankingService', () => {
  let service: RankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        { provide: WeatherService, useValue: mockWeatherService },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return sorted rankings', async () => {
    mockWeatherService.getWeatherConditions.mockResolvedValue({
      temperature: 20,
      windSpeed: 10,
      precipitation: 0,
      uvIndex: 5,
    });
    const rankings = await service.getRankings(10, 20);
    expect(Array.isArray(rankings)).toBe(true);
    expect(rankings.length).toBeGreaterThan(0);
    expect(rankings[0]).toHaveProperty('activity');
    expect(rankings[0]).toHaveProperty('score');
    expect(rankings[0]).toHaveProperty('conditions');
    // Should be sorted descending by score
    for (let i = 1; i < rankings.length; i++) {
      expect(rankings[i - 1].score).toBeGreaterThanOrEqual(rankings[i].score);
    }
  });
});
