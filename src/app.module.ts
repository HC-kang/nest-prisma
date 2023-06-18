import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { SecretModule } from './secret/secret.module';
import { UtilModule } from './util/util.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [PrismaModule, UserModule, SecretModule, UtilModule, PostModule],
})
export class AppModule {}
