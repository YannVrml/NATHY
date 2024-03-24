import { Test, TestingModule } from '@nestjs/testing';
import { IleviaService } from './ilevia.service';

describe('IleviaService', () => {
  let service: IleviaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IleviaService],
    }).compile();

    service = module.get<IleviaService>(IleviaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
