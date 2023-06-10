import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserValidator } from './user.validator';
import { User } from '@prisma/client';
import { GetUserParam } from './dto/get_user.dto';
import { UpdateUserBody, UpdateUserParam } from './dto/update_user.dto';
import { CreateUserBody } from './dto/create_user.dto';

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
    it('should return users', async () => {
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
      const result = await userService.getUsers();

      // Assert
      expect(result).toEqual(mockUsers);
      expect(mockUserRepository.getUsers).toBeCalledTimes(1);
      expect(mockUserRepository.getUsers).toBeCalledWith();
    });
  });

  describe('getUser Test', () => {
    it('should return an user', async () => {
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
      const result = await userService.getUser(param);

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.getUser).toBeCalledTimes(1);
      expect(mockUserRepository.getUser).toBeCalledWith(userFindUniqueArgs);
    });
  });

  it('createUser Test', async () => {
    // Arrange
    const mockBody: CreateUserBody = {
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
    const userCreateArgs = userValidator.createUserValidator(mockBody);
    mockUserRepository.createUser = jest.fn().mockResolvedValue(mockUser);

    // Act
    const result = await userService.createUser(mockBody);

    // Assert
    expect(result).toEqual(mockUser);
    expect(mockUserRepository.createUser).toBeCalledTimes(1);
    expect(mockUserRepository.createUser).toBeCalledWith(userCreateArgs);
  });

  describe('updateUser Test', () => {
    it('should return an user', async () => {
      // Arrange
      const param: UpdateUserParam = {
        userId: 1,
      };
      const body: UpdateUserBody = {
        name: 'Modified Test User',
      };
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: undefined,
        active: 0,
        role: 'USER',
      };

      const userUpdateInput = userValidator.updateUserValidator(param, body);
      mockUserRepository.updateUser = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await userService.updateUser(param, body);

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.updateUser).toBeCalledTimes(1);
      expect(mockUserRepository.updateUser).toBeCalledWith(userUpdateInput);
      // expect(result.name).toEqual(body.name); // -> 해당 테스트는 유닛테스트 목적에 맞지 않음
    });
  });

  describe('deleteUser Test', () => {
    it('should return an user', async () => {
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

      const userDeleteInput = userValidator.deleteUserValidator(param);
      mockUserRepository.deleteUser = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await userService.deleteUser(param);

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.deleteUser).toBeCalledTimes(1);
      expect(mockUserRepository.deleteUser).toBeCalledWith(userDeleteInput);
    });
  });
});
