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

    it('should been called with page and limit query parameters', () => {
      type FindAllParamsType = Parameters<typeof controller.findAll>
      type PageType = FindAllParamsType[0]
      type LimitType = FindAllParamsType[1]

      const page: PageType = 1;
      const limit: LimitType = 10;

      const spy = jest.spyOn(controller, 'findAll')

      controller.findAll(page, limit)

      expect(spy).toHaveBeenCalledWith(page, limit)

      const callArguments = spy.mock.calls[0];
      expect(typeof callArguments[0]).toBe('number');
      expect(typeof callArguments[1]).toBe('number');
    })
  })
});




