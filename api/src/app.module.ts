import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatGateway } from './prisma/chat.gateway';
import { PrismaService } from './prisma/prisma.service';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { GroupModule } from './group/group.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MessageModule,
    ChatModule,
    GroupModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, PrismaService],
})
export class AppModule {}
