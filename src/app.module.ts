import { Module } from '@nestjs/common';
import { UtilModule } from './util/util.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UtilModule, UsersModule, AuthModule],
})
export class AppModule {}
