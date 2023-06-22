import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@prismaModule/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUniqueOrThrow: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);
  });

  it('should return a JWT if the password is valid', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const user: User = {
      id: 1,
      email,
      password: await bcrypt.hash(password, 10),
      name: '',
      createdAt: undefined,
      updatedAt: undefined,
    };

    jest.spyOn(prisma.user, 'findUniqueOrThrow').mockResolvedValue(user);
    (jest.spyOn(bcrypt, 'compare') as jest.SpyInstance).mockResolvedValue(true);
    jest.spyOn(jwt, 'sign').mockReturnValue('fake-jwt-token');

    const result = await service.login(email, password);

    expect(result).toEqual({ accessToken: 'fake-jwt-token' });
  });

  it('should throw an UnauthorizedException if the password is invalid', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const user: User = {
      id: 1,
      email,
      password: await bcrypt.hash('wrong-password', 10),
      name: '',
      createdAt: undefined,
      updatedAt: undefined,
    };

    jest.spyOn(prisma.user, 'findUniqueOrThrow').mockResolvedValue(user);
    (jest.spyOn(bcrypt, 'compare') as jest.SpyInstance).mockResolvedValue(
      false,
    );

    await expect(service.login(email, password)).rejects.toThrow(
      'Invalid password',
    );
  });
});
