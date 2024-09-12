import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

describe('PersonController', () => {
  let controller: PersonController;
  let service: PersonService

  const mockService: Pick<PersonService, 'findAll'> = {
    findAll: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: mockService
        }
      ]
    }).compile();

    controller = module.get<PersonController>(PersonController);
    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET findAll()', () => {
    it('findAll() method should exists in person.controller.ts', () => {
      expect(controller.findAll).toBeDefined()
    })
  })
});




