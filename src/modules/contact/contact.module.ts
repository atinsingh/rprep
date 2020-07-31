import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactDto } from './contact.dto.entity';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports:[
      TypeOrmModule.forFeature([ContactDto]),
      NotificationModule
  ],
  providers: [ContactService],
  controllers: [ContactController]
})
export class ContactModule {
}
