import { Test, TestingModule } from '@nestjs/testing';
import { InscricaoService } from './inscricao.service';

describe('InscricaoService', () => {
  let service: InscricaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InscricaoService],
    }).compile();

    service = module.get<InscricaoService>(InscricaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
