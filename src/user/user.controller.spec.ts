import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserValidator } from './user.validator';
import { PrismaService } from '@prismaModule/prisma.service';
import { GetUserParam } from './dto/get_user.dto';

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
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const param: GetUserParam = {
        userId: 1,
      };
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      };
      mockUserService.getUser = jest.fn().mockResolvedValue(mockUser);

      expect(await userController.getUser(param)).toBe(mockUser);
    });
  });
});
