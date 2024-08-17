import { Test, TestingModule } from '@nestjs/testing';
import { TelegramStarsService } from './telegram-stars.service';

describe('TelegramStarsService', () => {
  let service: TelegramStarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramStarsService],
    }).compile();

    service = module.get<TelegramStarsService>(TelegramStarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
