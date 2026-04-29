import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from '../weather/weather.service';
import { RankingService } from './ranking.service';

const mockWeatherService = {
  get7DayWeatherConditions: jest.fn(),
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

  it('should return rankings for each activity and day', async () => {
    const mockDays = [
      {
        day: '2026-04-29',
        temperature: 20,
        windSpeed: 10,
        precipitation: 0,
        uvIndex: 5,
      },
      {
        day: '2026-04-30',
        temperature: 22,
        windSpeed: 8,
        precipitation: 1,
        uvIndex: 7,
      },
    ];
    mockWeatherService.get7DayWeatherConditions.mockResolvedValue(mockDays);
    const rankings = await service.getRankings(10, 20);
    expect(Array.isArray(rankings)).toBe(true);
    expect(rankings.length).toBeGreaterThan(0);
    expect(rankings[0]).toHaveProperty('activity');
    expect(rankings[0]).toHaveProperty('score');
    expect(rankings[0]).toHaveProperty('conditions');
    // Should include all activities for all days
    const activities = ['surfing', 'skiing', 'hiking', 'cycling', 'running'];
    const days = mockDays.map((d) => d.day);
    for (const r of rankings) {
      expect(activities).toContain(r.activity);
      expect(days).toContain(r.day);
    }
  });
});
