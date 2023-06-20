import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UtilModule } from './util/util.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UtilModule, UsersModule, AuthModule],
})
export class AppModule {}
