import { Injectable } from '@nestjs/common';
import Hubspot from 'hubspot';
import { ContactDto } from './contact.dto.entity';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';

import { MongoRepository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ContactService {

  constructor(
    @InjectRepository(ContactDto) 
    private readonly repository: MongoRepository<ContactDto>,
    private readonly notifyService: NotificationService
    ) {
  }

  async createContact(contact: ContactDto) : Promise<any> {
      contact.address = contact.address||'';
      contact.status = 0;
      contact.createdDate = new Date();
      this.notifyService.sendNewContactEmail(contact);
    //return await  this.repository.save(contact);

  }
}
