import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { PersonModule } from './person.module';

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PersonModule]
    }).compile();

    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
