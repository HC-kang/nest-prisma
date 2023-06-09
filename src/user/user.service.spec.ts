import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserValidator } from './user.validator';
import { User } from '@prisma/client';
import { GetUserParam } from './dto/get_user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userValidator: UserValidator;
  let mockUserRepository: Partial<UserRepository>;

  beforeEach(async () => {
    mockUserRepository = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserValidator,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userValidator = module.get<UserValidator>(UserValidator);
    mockUserRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUsers Test', () => {
    it('should return users', () => {
      // Arrange
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'Test User',
          email: 'first@example.com',
          createdAt: undefined,
          active: 0,
          role: 'USER',
        },
        {
          id: 2,
          name: 'Test User2',
          email: 'second@example.com',
          createdAt: undefined,
          active: 0,
          role: 'USER',
        },
      ];
      mockUserRepository.getUsers = jest.fn().mockResolvedValue(mockUsers);

      // Act
      const result = userService.getUsers();

      // Assert
      expect(result).resolves.toEqual(mockUsers);
      expect(mockUserRepository.getUsers).toBeCalledTimes(1);
      expect(mockUserRepository.getUsers).toBeCalledWith();
    });
  });

  describe('getUser Test', () => {
    it('should return an user', () => {
      // Arrange
      const param: GetUserParam = {
        userId: 1,
      };
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: undefined,
        active: 0,
        role: 'USER',
      };
      const userFindUniqueArgs = userValidator.getUserValidator(param);
      mockUserRepository.getUser = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = userService.getUser(param);

      // Assert
      expect(result).resolves.toEqual(mockUser);
      expect(mockUserRepository.getUser).toBeCalledTimes(1);
      expect(mockUserRepository.getUser).toBeCalledWith(userFindUniqueArgs);
    });
  });

  it('createUser Test', () => {
    // Arrange
    const mockBody = {
      name: 'Test User',
      email: 'test@example.com',
    };
    const mockUser: User = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      createdAt: undefined,
      active: 0,
      role: 'USER',
    };
    mockUserRepository.createUser = jest.fn().mockResolvedValue(mockUser);

    // Act
    const result = userService.createUser(mockBody);

    // Assert
    expect(result).resolves.toEqual(mockUser);
    expect(mockUserRepository.createUser).toBeCalledTimes(1);
    expect(mockUserRepository.createUser).toBeCalledWith(mockBody);
  });
});
