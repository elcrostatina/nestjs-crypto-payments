import { Test, TestingModule } from '@nestjs/testing';
import { ThirdPartyTonService } from './third-party-ton.service';

describe('ThirdPartyTonService', () => {
  let service: ThirdPartyTonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThirdPartyTonService],
    }).compile();

    service = module.get<ThirdPartyTonService>(ThirdPartyTonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
