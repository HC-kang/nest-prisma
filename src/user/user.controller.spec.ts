import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GetUserParam } from './dto/get_user.dto';
import { DeleteUserParam } from './dto/delete_user.dto';
import { UpdateUserBody, UpdateUserParam } from './dto/update_user.dto';
import { User } from '@prisma/client';
import { CreateUserBody } from './dto/create_user.dto';

describe('UserController', () => {
  let userController: UserController;
  let mockUserService: Partial<UserService>;

  beforeEach(async () => {
    mockUserService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    mockUserService = module.get<UserService>(UserService);
  });

  describe('UserController Test', () => {
    it('should be defined', () => {
      expect(userController).toBeDefined();
    });
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
      mockUserService.getUsers = jest.fn().mockResolvedValue(mockUsers);

      // Act
      const result = await userController.getUsers();

      // Assert
      expect(result).toBe(mockUsers);
      expect(mockUserService.getUsers).toBeCalledTimes(1);
      expect(mockUserService.getUsers).toBeCalledWith();
    });
  });

  describe('getUser Test', () => {
    it('should return a user', async () => {
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
      mockUserService.getUser = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await userController.getUser(param);

      // Assert
      expect(result).toBe(mockUser);
      expect(mockUserService.getUser).toBeCalledTimes(1);
      expect(mockUserService.getUser).toBeCalledWith(param);
    });
  });

  describe('createUser Test', () => {
    it('should create a user', async () => {
      // Arrange
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: undefined,
        active: 0,
        role: 'USER',
      };
      const mockCreateUserBody: CreateUserBody = {
        name: 'Test User',
        email: 'test@example.com',
      };
      mockUserService.createUser = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await userController.createUser(mockCreateUserBody);

      // Assert
      expect(result).toBe(mockUser);
      expect(mockUserService.createUser).toBeCalledTimes(1);
      expect(mockUserService.createUser).toBeCalledWith(mockCreateUserBody);
    });
  });

  describe('updateUser Test', () => {
    it('should update a user', async () => {
      // Arrange
      const param: UpdateUserParam = {
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
      const mockUpdateUserBody: UpdateUserBody = {
        name: 'Test User Modified',
      };
      mockUserService.updateUser = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await userController.updateUser(param, mockUpdateUserBody);

      // Assert
      expect(result).toBe(mockUser);
      expect(mockUserService.updateUser).toBeCalledTimes(1);
      expect(mockUserService.updateUser).toBeCalledWith(
        param,
        mockUpdateUserBody,
      );
    });
  });

  describe('deleteUser Test', () => {
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
      mockUserService.deleteUser = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await userController.deleteUser(param);

      // Assert
      expect(result).toBe(mockUser);
      expect(mockUserService.deleteUser).toBeCalledTimes(1);
      expect(mockUserService.deleteUser).toBeCalledWith(param);
    });
  });
});
