import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactDto } from './contact.dto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ContactDto])],
  providers: [ContactService],
  controllers: [ContactController]
})
export class ContactModule {
}
