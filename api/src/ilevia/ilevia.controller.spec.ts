import { Test, TestingModule } from '@nestjs/testing';
import { IleviaController } from './ilevia.controller';

describe('IleviaController', () => {
  let controller: IleviaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IleviaController],
    }).compile();

    controller = module.get<IleviaController>(IleviaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
