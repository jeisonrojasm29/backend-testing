import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonModule } from './person.module';
import { PersonService } from './person.service';

describe('PersonController', () => {
  let controller: PersonController;
  let service: PersonService

  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Jeison Rojas' }])
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

    it('should call personService.findAll', async () => {
      await controller.findAll()
      expect(service.findAll).toHaveBeenCalled();
    })

    it('should return an array of persons', async () => {
      const expectedResult = [{ id: 1, name: 'Jeison Rojas' }]
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult)

      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
    })

    it('should handle errors from the service', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error('Service error'))

      try {
        await controller.findAll()
      } catch (error) {
        expect(error.message).toBe('Service error')
      }
    })

  })
});
