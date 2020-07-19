import { Body, Controller, Post } from '@nestjs/common';
import { ContactDto } from './contact.dto.entity';
import { ContactService } from './contact.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('api/contact')
export class ContactController {

  constructor(private contactService: ContactService) {
  }

  @ApiBody(
    {
      type:ContactDto
    }
  )
  @Post()
  async createContact(@Body() contactDto: ContactDto) {
    return this.contactService.createContact(contactDto);
  }
}
