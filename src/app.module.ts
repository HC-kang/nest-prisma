import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { SecretModule } from './secret/secret.module';
import { UtilModule } from './util/util.module';

@Module({
  imports: [PrismaModule, UserModule, SecretModule, UtilModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
