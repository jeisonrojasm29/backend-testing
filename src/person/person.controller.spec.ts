import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonModule } from './person.module';

describe('PersonController', () => {
  let controller: PersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PersonModule]
    }).compile();

    controller = module.get<PersonController>(PersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should retorn the string "person"', () => {
    jest.spyOn(controller, 'findAll').mockImplementation(() => 'person')
    expect(controller.findAll()).toBe('person')
  })
});
