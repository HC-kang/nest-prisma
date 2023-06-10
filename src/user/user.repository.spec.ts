import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { PrismaService } from '@prismaModule/prisma.service';
import { UserValidator } from './user.validator';
import { User } from '@prisma/client';
import { GetUserParam } from './dto/get_user.dto';
import { CreateUserBody } from './dto/create_user.dto';
import { UpdateUserBody, UpdateUserParam } from './dto/update_user.dto';
import { DeleteUserParam } from './dto/delete_user.dto';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userValidator: UserValidator;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, UserValidator, PrismaService],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userValidator = module.get<UserValidator>(UserValidator);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
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
      prismaService.user.findMany = jest.fn().mockResolvedValue(mockUsers);

      // Act
      const result = await userRepository.getUsers();

      // Assert
      expect(result).toEqual(mockUsers);
      expect(prismaService.user.findMany).toBeCalledTimes(1);
      expect(prismaService.user.findMany).toBeCalledWith();
    });
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      // Arrange
      const param: GetUserParam = { userId: 1 };
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: undefined,
        active: 0,
        role: 'USER',
      };
      const userFindUniqueArgs = userValidator.getUserValidator(param);
      prismaService.user.findUnique = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await userRepository.getUser(userFindUniqueArgs);

      // Assert
      expect(result).toEqual(mockUser);
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith(userFindUniqueArgs);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
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
      prismaService.user.create = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await userRepository.createUser(userCreateArgs);

      // Assert
      expect(result).toEqual(mockUser);
      expect(prismaService.user.create).toBeCalledTimes(1);
      expect(prismaService.user.create).toBeCalledWith({
        data: userCreateArgs,
      });
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
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
      prismaService.user.update = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await userRepository.updateUser(userUpdateInput);

      // Assert
      expect(result).toEqual(mockUser);
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith(userUpdateInput);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      // Arrange
      const param: DeleteUserParam = {
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
      prismaService.user.update = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await userRepository.deleteUser(userDeleteInput);

      // Assert
      expect(result).toEqual(mockUser);
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith(userDeleteInput);
    });
  });
});
